// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Empty} from 'google-protobuf/google/protobuf/empty_pb';
import {CallOptions, ClientUnaryCall, Metadata} from 'grpc';
import {SinonSpy} from 'sinon';
import {ICommandServiceClient} from "../../src/generated/com/digitalasset/ledger/api/v1/command_service_grpc_pb";
import {SubmitAndWaitRequest} from "../../src/generated/com/digitalasset/ledger/api/v1/command_service_pb";
import {DummyClientUnaryCall} from "../call/DummyClientUnaryCall";

export class DummyCommandServiceClient implements ICommandServiceClient {
    private readonly lastRequestSpy: SinonSpy;

    constructor(lastRequestSpy: SinonSpy) {
        this.lastRequestSpy = lastRequestSpy;
    }

    submitAndWait(
        request: SubmitAndWaitRequest,
        callback: (error: Error | null, response: Empty) => void
    ): ClientUnaryCall;
    submitAndWait(
        request: SubmitAndWaitRequest,
        metadata: Metadata,
        callback: (error: Error | null, response: Empty) => void
    ): ClientUnaryCall;
    submitAndWait(
        request: SubmitAndWaitRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (error: Error | null, response: Empty) => void
    ): ClientUnaryCall;
    submitAndWait(
        request: SubmitAndWaitRequest,
        metadata: any,
        options?: any,
        callback?: any
    ): ClientUnaryCall {
        this.lastRequestSpy(request);
        const cb =
            callback === undefined
                ? options === undefined
                ? metadata
                : options
                : callback;
        cb(null, Empty);
        return DummyClientUnaryCall.Instance;
    }
}
