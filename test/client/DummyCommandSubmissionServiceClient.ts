// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as sinon from 'sinon';
import {CallOptions, ClientUnaryCall, Metadata, ServiceError} from '@grpc/grpc-js';
import {Empty} from 'google-protobuf/google/protobuf/empty_pb';
import {ICommandSubmissionServiceClient} from "../../src/generated/com/daml/ledger/api/v1/command_submission_service_grpc_pb";
import {SubmitRequest} from "../../src/generated/com/daml/ledger/api/v1/command_submission_service_pb";
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
        callback: (error: ServiceError | null, response: Empty) => void
    ): ClientUnaryCall;
    submit(
        request: SubmitRequest,
        metadata: Metadata,
        callback: (error: ServiceError | null, response: Empty) => void
    ): ClientUnaryCall;
    submit(
        request: SubmitRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (error: ServiceError | null, response: Empty) => void
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
