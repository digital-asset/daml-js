// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {GetActiveContractsRequest} from "../model/GetActiveContractsRequest";
import {ClientReadableObjectStream} from "../call/ClientReadableObjectStream";
import {GetActiveContractsResponse} from "../model/GetActiveContractsResponse";

/**
 * Allows clients to initialize themselves according to a fairly recent state
 * of the ledger without reading through all transactions that were committed
 * since the ledger's creation.
 */
export interface ActiveContractsClient {

    /**
     * Returns a stream of the latest snapshot of active contracts. Getting an
     * empty stream means that the active contracts set is empty and the client
     * should listen to transactions using LEDGER_BEGIN.
     *
     * Clients SHOULD NOT assume that the set of active contracts they receive
     * reflects the state at the ledger end.
     */
    getActiveContracts(requestObject: GetActiveContractsRequest): ClientReadableObjectStream<GetActiveContractsResponse>

}