// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {CallOptions, ClientReadableStream, ClientUnaryCall, Metadata, ServiceError} from '@grpc/grpc-js';

import * as sinon from 'sinon';
import {Empty} from 'google-protobuf/google/protobuf/empty_pb';
import {ITimeServiceClient} from "../../src/generated/com/daml/ledger/api/v1/testing/time_service_grpc_pb";
import {
    GetTimeRequest,
    GetTimeResponse, SetTimeRequest
} from "../../src/generated/com/daml/ledger/api/v1/testing/time_service_pb";
import {DummyClientReadableStream} from "../call/DummyClientReadableStream";
import {DummyClientUnaryCall} from "../call/DummyClientUnaryCall";

export class DummyTimeServiceClient implements ITimeServiceClient {
    private static readonly empty = new Empty();

    private readonly latestRequestSpy: sinon.SinonSpy;

    constructor(
        latestRequestSpy: sinon.SinonSpy
    ) {
        this.latestRequestSpy = latestRequestSpy;
    }

    getTime(
        request: GetTimeRequest,
        options?: Partial<CallOptions> | undefined
    ): ClientReadableStream<GetTimeResponse>;
    getTime(
        request: GetTimeRequest,
        metadata?: Metadata | undefined,
        options?: Partial<CallOptions> | undefined
    ): ClientReadableStream<GetTimeResponse>;
    getTime(
        request: GetTimeRequest,
        _metadata?: any,
        _options?: any
    ) {
        this.latestRequestSpy(request);
        return DummyClientReadableStream.empty();
    }

    setTime(
        request: SetTimeRequest,
        callback: (error: ServiceError | null, response: Empty) => void
    ): ClientUnaryCall;
    setTime(
        request: SetTimeRequest,
        metadata: Metadata,
        callback: (error: ServiceError | null, response: Empty) => void
    ): ClientUnaryCall;
    setTime(
        request: SetTimeRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (error: ServiceError | null, response: Empty) => void
    ): ClientUnaryCall;
    setTime(
        request: SetTimeRequest,
        metadata: any,
        options?: any,
        callback?: any
    ) {
        this.latestRequestSpy(request);
        const cb =
            callback === undefined
                ? options === undefined
                ? metadata
                : options
                : callback;
        cb(null, DummyTimeServiceClient.empty);
        return DummyClientUnaryCall.Instance;
    }
}
