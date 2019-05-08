// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {CallOptions, ClientUnaryCall, Metadata} from 'grpc';

import * as sinon from 'sinon';

import {Empty} from 'google-protobuf/google/protobuf/empty_pb';
import {IResetServiceClient} from "../../src/generated/com/digitalasset/ledger/api/v1/testing/reset_service_grpc_pb";
import {ResetRequest} from "../../src/generated/com/digitalasset/ledger/api/v1/testing/reset_service_pb";
import {DummyClientUnaryCall} from "../call/DummyClientUnaryCall";

export class DummyResetServiceClient implements IResetServiceClient {
    private static readonly empty = new Empty();

    private readonly latestRequestSpy: sinon.SinonSpy;

    constructor(latestRequestSpy: sinon.SinonSpy) {
        this.latestRequestSpy = latestRequestSpy;
    }

    reset(
        request: ResetRequest,
        callback: (error: Error | null, response: Empty) => void
    ): ClientUnaryCall;
    reset(
        request: ResetRequest,
        metadata: Metadata,
        callback: (error: Error | null, response: Empty) => void
    ): ClientUnaryCall;
    reset(
        request: ResetRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (error: Error | null, response: Empty) => void
    ): ClientUnaryCall;
    reset(
        request: ResetRequest,
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
        cb(null, DummyResetServiceClient.empty);
        return DummyClientUnaryCall.Instance;
    }
}
