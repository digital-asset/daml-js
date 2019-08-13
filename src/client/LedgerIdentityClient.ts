// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Callback} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {GetLedgerIdentityResponse} from "../model/GetLedgerIdentityResponse";

/**
 * Allows clients to verify that the server they are communicating with
 * exposes the ledger they wish to operate on.
 *
 * Note that every ledger has a unique id.
 */
export interface LedgerIdentityClient {

    /**
     * Clients may call this RPC to return the identifier of the ledger they
     * are connected to.
     */
    getLedgerIdentity(): Promise<GetLedgerIdentityResponse>
    getLedgerIdentity(callback: Callback<GetLedgerIdentityResponse>): ClientCancellableCall

}
