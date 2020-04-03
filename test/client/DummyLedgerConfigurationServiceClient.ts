// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as sinon from 'sinon';

import {CallOptions, ClientReadableStream, Metadata} from 'grpc';
import {
    GetLedgerConfigurationRequest,
    GetLedgerConfigurationResponse
} from "../../src/generated/com/digitalasset/ledger/api/v1/ledger_configuration_service_pb";
import {ILedgerConfigurationServiceClient} from "../../src/generated/com/digitalasset/ledger/api/v1/ledger_configuration_service_grpc_pb";
import {DummyClientReadableStream} from "../call/DummyClientReadableStream";

export class DummyLedgerConfigurationServiceClient
    implements ILedgerConfigurationServiceClient {
    private readonly latestRequestSpy: sinon.SinonSpy;

    constructor(
        latestRequestSpy: sinon.SinonSpy
    ) {
        this.latestRequestSpy = latestRequestSpy;
    }

    getLedgerConfiguration(
        request: GetLedgerConfigurationRequest,
        options?: Partial<CallOptions> | undefined
    ): ClientReadableStream<GetLedgerConfigurationResponse>;
    getLedgerConfiguration(
        request: GetLedgerConfigurationRequest,
        metadata?: Metadata | undefined,
        options?: Partial<CallOptions> | undefined
    ): ClientReadableStream<GetLedgerConfigurationResponse>;
    getLedgerConfiguration(
        request: GetLedgerConfigurationRequest,
        _metadata?: any,
        _options?: any
    ) {
        this.latestRequestSpy(request);
        return DummyClientReadableStream.empty();
    }
}
