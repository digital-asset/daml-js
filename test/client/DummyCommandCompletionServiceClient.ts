// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as sinon from 'sinon';
import {CallOptions, ClientReadableStream, ClientUnaryCall, Metadata} from 'grpc';
import {ICommandCompletionServiceClient} from "../../src/generated/com/digitalasset/ledger/api/v1/command_completion_service_grpc_pb";
import {
    CompletionEndRequest,
    CompletionEndResponse, CompletionStreamRequest,
    CompletionStreamResponse
} from "../../src/generated/com/digitalasset/ledger/api/v1/command_completion_service_pb";
import {DummyClientUnaryCall} from "../call/DummyClientUnaryCall";
import {DummyClientReadableStream} from "../call/DummyClientReadableStream";
import {LedgerOffset} from "../../src/generated/com/digitalasset/ledger/api/v1/ledger_offset_pb";

export class DummyCommandCompletionServiceClient
    implements ICommandCompletionServiceClient {
    private readonly end: CompletionEndResponse;
    private readonly lastRequestSpy: sinon.SinonSpy;

    constructor(
        lastRequestSpy: sinon.SinonSpy
    ) {
        this.end = new CompletionEndResponse();
        const offset = new LedgerOffset();
        offset.setBoundary(LedgerOffset.LedgerBoundary.LEDGER_BEGIN);
        this.end.setOffset(offset);
        this.lastRequestSpy = lastRequestSpy;
    }

    completionEnd(
        request: CompletionEndRequest,
        callback: (
            error: Error | null,
            response: CompletionEndResponse
        ) => void
    ): ClientUnaryCall;
    completionEnd(
        request: CompletionEndRequest,
        metadata: Metadata,
        callback: (
            error: Error | null,
            response: CompletionEndResponse
        ) => void
    ): ClientUnaryCall;
    completionEnd(
        request: CompletionEndRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (
            error: Error | null,
            response: CompletionEndResponse
        ) => void
    ): ClientUnaryCall;
    completionEnd(
        request: CompletionEndRequest,
        metadata: any,
        options?: any,
        callback?: any
    ) {
        this.lastRequestSpy(request);
        const cb =
            callback === undefined
                ? options === undefined
                ? metadata
                : options
                : callback;
        cb(null, this.end);
        return DummyClientUnaryCall.Instance;
    }

    completionStream(
        request: CompletionStreamRequest,
        options?: Partial<CallOptions> | undefined
    ): ClientReadableStream<CompletionStreamResponse>;
    completionStream(
        request: CompletionStreamRequest,
        metadata?: Metadata | undefined,
        options?: Partial<CallOptions> | undefined
    ): ClientReadableStream<CompletionStreamResponse>;
    completionStream(
        request: CompletionStreamRequest,
        _metadata?: any,
        _options?: any
    ) {
        this.lastRequestSpy(request);
        return DummyClientReadableStream.empty();
    }
}
