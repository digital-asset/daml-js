// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as sinon from 'sinon';

import {CallOptions, ClientReadableStream, ClientUnaryCall, Metadata} from 'grpc';
import {Timestamp} from 'google-protobuf/google/protobuf/timestamp_pb';
import {ITransactionServiceClient} from "../../src/generated/com/digitalasset/ledger/api/v1/transaction_service_grpc_pb";
import {
    GetLedgerEndRequest,
    GetLedgerEndResponse, GetTransactionByEventIdRequest, GetTransactionByIdRequest,
    GetTransactionResponse, GetTransactionsRequest, GetTransactionsResponse, GetTransactionTreesResponse
} from "../../src/generated/com/digitalasset/ledger/api/v1/transaction_service_pb";
import {DummyClientReadableStream} from "../call/DummyClientReadableStream";
import {DummyClientUnaryCall} from "../call/DummyClientUnaryCall";
import {LedgerOffset} from "../../src/generated/com/digitalasset/ledger/api/v1/ledger_offset_pb";
import {TransactionTree} from "../../src/generated/com/digitalasset/ledger/api/v1/transaction_pb";

export class DummyTransactionServiceClient implements ITransactionServiceClient {
    private readonly latestRequestSpy: sinon.SinonSpy;

    private readonly ledgerEndResponse = new GetLedgerEndResponse();
    private readonly transactionResponse = new GetTransactionResponse();

    constructor(latestRequestSpy: sinon.SinonSpy) {
        this.latestRequestSpy = latestRequestSpy;
        this.initEmptyLedgerEndResponse();
        this.initEmptyTransactionResponse();
    }

    getTransactions(
        request: GetTransactionsRequest,
        options?: Partial<CallOptions> | undefined
    ): ClientReadableStream<GetTransactionsResponse>;

    getTransactions(
        request: GetTransactionsRequest,
        metadata?: Metadata | undefined,
        options?: Partial<CallOptions> | undefined
    ): ClientReadableStream<GetTransactionsResponse>;

    getTransactions(
        request: GetTransactionsRequest,
        _metadata?: any,
        _options?: any
    ) {
        this.latestRequestSpy(request);
        return DummyClientReadableStream.with([]);
    }

    getTransactionTrees(
        request: GetTransactionsRequest,
        options?: Partial<CallOptions> | undefined
    ): ClientReadableStream<GetTransactionTreesResponse>;

    getTransactionTrees(
        request: GetTransactionsRequest,
        metadata?: Metadata | undefined,
        options?: Partial<CallOptions> | undefined
    ): ClientReadableStream<GetTransactionTreesResponse>;

    getTransactionTrees(
        request: GetTransactionsRequest,
        _metadata?: any,
        _options?: any
    ) {
        this.latestRequestSpy(request);
        return DummyClientReadableStream.with([]);
    }

    getTransactionByEventId(
        request: GetTransactionByEventIdRequest,
        callback: (
            error: Error | null,
            response: GetTransactionResponse
        ) => void
    ): ClientUnaryCall;

    getTransactionByEventId(
        request: GetTransactionByEventIdRequest,
        metadata: Metadata,
        callback: (
            error: Error | null,
            response: GetTransactionResponse
        ) => void
    ): ClientUnaryCall;

    getTransactionByEventId(
        request: GetTransactionByEventIdRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (
            error: Error | null,
            response: GetTransactionResponse
        ) => void
    ): ClientUnaryCall;

    getTransactionByEventId(
        request: GetTransactionByEventIdRequest,
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
        setImmediate(() => cb(null, this.transactionResponse));
        return DummyClientUnaryCall.Instance;
    }

    getTransactionById(
        request: GetTransactionByIdRequest,
        callback: (
            error: Error | null,
            response: GetTransactionResponse
        ) => void
    ): ClientUnaryCall;

    getTransactionById(
        request: GetTransactionByIdRequest,
        metadata: Metadata,
        callback: (
            error: Error | null,
            response: GetTransactionResponse
        ) => void
    ): ClientUnaryCall;

    getTransactionById(
        request: GetTransactionByIdRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (
            error: Error | null,
            response: GetTransactionResponse
        ) => void
    ): ClientUnaryCall;

    getTransactionById(
        request: GetTransactionByIdRequest,
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
        setImmediate(() => cb(null, this.transactionResponse));
        return DummyClientUnaryCall.Instance;
    }

    getLedgerEnd(
        request: GetLedgerEndRequest,
        callback: (error: Error | null, response: GetLedgerEndResponse) => void
    ): ClientUnaryCall;

    getLedgerEnd(
        request: GetLedgerEndRequest,
        metadata: Metadata,
        callback: (error: Error | null, response: GetLedgerEndResponse) => void
    ): ClientUnaryCall;

    getLedgerEnd(
        request: GetLedgerEndRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (error: Error | null, response: GetLedgerEndResponse) => void
    ): ClientUnaryCall;

    getLedgerEnd(
        request: GetLedgerEndRequest,
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
        setImmediate(() => cb(null, this.ledgerEndResponse));
        return DummyClientUnaryCall.Instance;
    }

    private initEmptyLedgerEndResponse() {
        const offset = new LedgerOffset();
        offset.setBoundary(LedgerOffset.LedgerBoundary.LEDGER_BEGIN);
        this.ledgerEndResponse.setOffset(offset);
    }

    private initEmptyTransactionResponse() {
        const effectiveAt = new Timestamp();
        effectiveAt.setSeconds(0);
        effectiveAt.setNanos(0);
        const tree = new TransactionTree();
        tree.setEffectiveAt(effectiveAt);
        tree.setOffset('mock');
        tree.setTransactionId('mock');
        this.transactionResponse.setTransaction(tree);
    }
}
