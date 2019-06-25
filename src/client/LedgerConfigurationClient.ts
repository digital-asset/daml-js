// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {ClientReadableObjectStream} from "../call/ClientReadableObjectStream";
import {GetLedgerConfigurationResponse} from "../model/GetLedgerConfigurationResponse";

/**
 * LedgerConfigurationService allows clients to subscribe to changes of
 * the ledger configuration.
 */
export interface LedgerConfigurationClient {

    /**
     * GetLedgerConfiguration returns the latest configuration as the first response, and publishes configuration updates in the same stream.
     */
    getLedgerConfiguration(): ClientReadableObjectStream<GetLedgerConfigurationResponse>

}