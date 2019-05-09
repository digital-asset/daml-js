// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Empty} from 'google-protobuf/google/protobuf/empty_pb';
import {CallOptions, ClientUnaryCall, Metadata} from 'grpc';
import {SinonSpy} from 'sinon';
import {ICommandServiceClient} from "../../src/generated/com/digitalasset/ledger/api/v1/command_service_grpc_pb";
import {
    SubmitAndWaitForTransactionIdResponse,
    SubmitAndWaitForTransactionResponse, SubmitAndWaitForTransactionTreeResponse,
    SubmitAndWaitRequest
} from "../../src/generated/com/digitalasset/ledger/api/v1/command_service_pb";
import {DummyClientUnaryCall} from "../call/DummyClientUnaryCall";
import {Timestamp} from "google-protobuf/google/protobuf/timestamp_pb";
import {Transaction, TransactionTree} from "../../src/generated/com/digitalasset/ledger/api/v1/transaction_pb";

export class DummyCommandServiceClient implements ICommandServiceClient {

    private readonly lastRequestSpy: SinonSpy;

    private readonly empty = new Empty();
    private readonly submitAndWaitForTransactionResponse = DummyCommandServiceClient.emptySubmitAndWaitForTransactionResponse();
    private readonly submitAndWaitForTransactionIdResponse = new SubmitAndWaitForTransactionIdResponse();
    private readonly submitAndWaitForTransactionTreeResponse = DummyCommandServiceClient.emptySubmitAndWaitForTransactionTreeResponse();

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
        cb(null, this.empty);
        return DummyClientUnaryCall.Instance;
    }

    submitAndWaitForTransaction(
        request: SubmitAndWaitRequest,
        callback: (error: Error | null, response: SubmitAndWaitForTransactionResponse) => void
    ): ClientUnaryCall;
    submitAndWaitForTransaction(
        request: SubmitAndWaitRequest,
        metadata: Metadata,
        callback: (error: Error | null, response: SubmitAndWaitForTransactionResponse) => void
    ): ClientUnaryCall;
    submitAndWaitForTransaction(
        request: SubmitAndWaitRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (error: Error | null, response: SubmitAndWaitForTransactionResponse) => void
    ): ClientUnaryCall;
    submitAndWaitForTransaction(
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
        cb(null, this.submitAndWaitForTransactionResponse);
        return DummyClientUnaryCall.Instance;
    }

    submitAndWaitForTransactionId(
        request: SubmitAndWaitRequest,
        callback: (error: Error | null, response: SubmitAndWaitForTransactionIdResponse) => void
    ): ClientUnaryCall;
    submitAndWaitForTransactionId(
        request: SubmitAndWaitRequest,
        metadata: Metadata,
        callback: (error: Error | null, response: SubmitAndWaitForTransactionIdResponse) => void
    ): ClientUnaryCall;
    submitAndWaitForTransactionId(
        request: SubmitAndWaitRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (error: Error | null, response: SubmitAndWaitForTransactionIdResponse) => void
    ): ClientUnaryCall;
    submitAndWaitForTransactionId(
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
        cb(null, this.submitAndWaitForTransactionIdResponse);
        return DummyClientUnaryCall.Instance;
    }

    submitAndWaitForTransactionTree(
        request: SubmitAndWaitRequest,
        callback: (error: Error | null, response: SubmitAndWaitForTransactionTreeResponse) => void
    ): ClientUnaryCall;
    submitAndWaitForTransactionTree(
        request: SubmitAndWaitRequest,
        metadata: Metadata,
        callback: (error: Error | null, response: SubmitAndWaitForTransactionTreeResponse) => void
    ): ClientUnaryCall;
    submitAndWaitForTransactionTree(
        request: SubmitAndWaitRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (error: Error | null, response: SubmitAndWaitForTransactionTreeResponse) => void
    ): ClientUnaryCall;
    submitAndWaitForTransactionTree(
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
        cb(null, this.submitAndWaitForTransactionTreeResponse);
        return DummyClientUnaryCall.Instance;
    }

    private static emptySubmitAndWaitForTransactionTreeResponse() {
        const message = new SubmitAndWaitForTransactionTreeResponse();
        const effectiveAt = new Timestamp();
        effectiveAt.setSeconds(0);
        effectiveAt.setNanos(0);
        const tree = new TransactionTree();
        tree.setEffectiveAt(effectiveAt);
        tree.setOffset('mock');
        tree.setTransactionId('mock');
        message.setTransaction(tree);
        return message;
    }

    private static emptySubmitAndWaitForTransactionResponse() {
        const message = new SubmitAndWaitForTransactionResponse();
        const effectiveAt = new Timestamp();
        effectiveAt.setSeconds(0);
        effectiveAt.setNanos(0);
        const transaction = new Transaction();
        transaction.setEffectiveAt(effectiveAt);
        transaction.setOffset('mock');
        transaction.setTransactionId('mock');
        message.setTransaction(transaction);
        return message;
    }

}
