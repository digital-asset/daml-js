// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {CallOptions, ClientUnaryCall, Metadata, ServiceError} from '@grpc/grpc-js';
import {
    GetLedgerIdentityRequest,
    GetLedgerIdentityResponse
} from "../../src/generated/com/daml/ledger/api/v1/ledger_identity_service_pb";
import {ILedgerIdentityServiceClient} from "../../src/generated/com/daml/ledger/api/v1/ledger_identity_service_grpc_pb";
import {DummyClientUnaryCall} from "../call/DummyClientUnaryCall";
import * as sinon from "sinon";

export class DummyLedgerIdentityServiceClient implements ILedgerIdentityServiceClient {
    private readonly ledgerId: GetLedgerIdentityResponse;
    private readonly latestRequestSpy: sinon.SinonSpy;

    constructor(latestRequestSpy: sinon.SinonSpy) {
        this.ledgerId = new GetLedgerIdentityResponse();
        this.ledgerId.setLedgerId('dummy');
        this.latestRequestSpy = latestRequestSpy;
    }

    getLedgerIdentity(
        request: GetLedgerIdentityRequest,
        callback: (
            error: ServiceError | null,
            response: GetLedgerIdentityResponse
        ) => void
    ): ClientUnaryCall;
    getLedgerIdentity(
        request: GetLedgerIdentityRequest,
        metadata: Metadata,
        callback: (
            error: ServiceError | null,
            response: GetLedgerIdentityResponse
        ) => void
    ): ClientUnaryCall;
    getLedgerIdentity(
        request: GetLedgerIdentityRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (
            error: ServiceError | null,
            response: GetLedgerIdentityResponse
        ) => void
    ): ClientUnaryCall;
    getLedgerIdentity(
        request: GetLedgerIdentityRequest,
        metadata: any,
        options?: any,
        callback?: any
    ) {
        const cb =
            callback === undefined
                ? options === undefined
                ? metadata
                : options
                : callback;
        this.latestRequestSpy(request);
        cb(null, this.ledgerId);
        return DummyClientUnaryCall.Instance;
    }
}
