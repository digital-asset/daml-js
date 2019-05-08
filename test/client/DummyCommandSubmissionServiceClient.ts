// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as sinon from 'sinon';
import {CallOptions, ClientUnaryCall, Metadata} from 'grpc';
import {Empty} from 'google-protobuf/google/protobuf/empty_pb';
import {ICommandSubmissionServiceClient} from "../../src/generated/com/digitalasset/ledger/api/v1/command_submission_service_grpc_pb";
import {SubmitRequest} from "../../src/generated/com/digitalasset/ledger/api/v1/command_submission_service_pb";
import {DummyClientUnaryCall} from "../call/DummyClientUnaryCall";

export class DummyCommandSubmissionServiceClient
    implements ICommandSubmissionServiceClient {
    private static readonly empty = new Empty();
    private readonly lastRequestSpy: sinon.SinonSpy;

    constructor(lastRequestSpy: sinon.SinonSpy) {
        this.lastRequestSpy = lastRequestSpy;
    }

    submit(
        request: SubmitRequest,
        callback: (error: Error | null, response: Empty) => void
    ): ClientUnaryCall;
    submit(
        request: SubmitRequest,
        metadata: Metadata,
        callback: (error: Error | null, response: Empty) => void
    ): ClientUnaryCall;
    submit(
        request: SubmitRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (error: Error | null, response: Empty) => void
    ): ClientUnaryCall;
    submit(request: any, metadata: any, options?: any, callback?: any) {
        this.lastRequestSpy(request);
        const cb =
            callback === undefined
                ? options === undefined
                ? metadata
                : options
                : callback;
        cb(null, DummyCommandSubmissionServiceClient.empty);
        return DummyClientUnaryCall.Instance;
    }
}
