// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {GetLedgerConfigurationRequest} from "../generated/com/digitalasset/ledger/api/v1/ledger_configuration_service_pb";
import {ILedgerConfigurationServiceClient} from "../generated/com/digitalasset/ledger/api/v1/ledger_configuration_service_grpc_pb";
import {ClientReadableObjectStream} from "../call/ClientReadableObjectStream";
import {GetLedgerConfigurationResponse} from "../model/GetLedgerConfigurationResponse";
import {GetLedgerConfigurationResponseCodec} from "../codec/GetLedgerConfigurationResponseCodec";

/**
 * LedgerConfigurationService allows clients to subscribe to changes of
 * the ledger configuration.
 */
export class LedgerConfigurationClient {

    private readonly request: GetLedgerConfigurationRequest;
    private readonly client: ILedgerConfigurationServiceClient;

    constructor(ledgerId: string, client: ILedgerConfigurationServiceClient) {
        this.request = new GetLedgerConfigurationRequest();
        this.request.setLedgerId(ledgerId);
        this.client = client;
    }

    /**
     * GetLedgerConfiguration returns the latest configuration as the first response, and publishes configuration updates in the same stream.
     */
    getLedgerConfiguration(): ClientReadableObjectStream<GetLedgerConfigurationResponse> {
        return ClientReadableObjectStream.from(this.client.getLedgerConfiguration(this.request), GetLedgerConfigurationResponseCodec);
    }

}