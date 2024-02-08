// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ClientReadableStream} from '@grpc/grpc-js';
import {SinonSpy} from 'sinon';
import {IActiveContractsServiceClient} from "../../src/generated/com/daml/ledger/api/v1/active_contracts_service_grpc_pb";
import {
    GetActiveContractsRequest,
    GetActiveContractsResponse
} from "../../src/generated/com/daml/ledger/api/v1/active_contracts_service_pb";
import {DummyClientReadableStream} from "../call/DummyClientReadableStream";

export class DummyActiveContractsServiceClient
    implements IActiveContractsServiceClient {
    private readonly lastRequestSpy: SinonSpy;

    constructor(
        lastRequestSpy: SinonSpy
    ) {
        this.lastRequestSpy = lastRequestSpy;
    }

    getActiveContracts(
        request: GetActiveContractsRequest
    ): ClientReadableStream<GetActiveContractsResponse> {
        this.lastRequestSpy(request);
        return DummyClientReadableStream.empty();
    }
}
