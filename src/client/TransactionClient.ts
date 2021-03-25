// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {GetLedgerEndResponse} from "../model/GetLedgerEndResponse";
import {Callback} from "../util/Callback";
import {GetTransactionResponse} from "../model/GetTransactionResponse";
import {GetTransactionByEventIdRequest} from "../model/GetTransactionByEventIdRequest";
import {GetTransactionByIdRequest} from "../model/GetTransactionByIdRequest";
import {GetTransactionsResponse} from "../model/GetTransactionsResponse";
import {ClientReadableObjectStream} from "../call/ClientReadableObjectStream";
import {GetTransactionsRequest} from "../model/GetTransactionsRequest";
import {GetTransactionTreesResponse} from "../model/GetTransactionTreesResponse";
import {GetFlatTransactionResponse} from "../model/GetFlatTransactionResponse";

/**
 * Allows clients to read transactions from the ledger.
 */
export interface TransactionClient {

    /**
     * Get the current ledger end.
     *
     * Subscriptions started with the returned offset will serve transactions
     * created after this RPC was called.
     */
    getLedgerEnd(): Promise<GetLedgerEndResponse>
    getLedgerEnd(callback: Callback<GetLedgerEndResponse>): ClientCancellableCall

    /**
     * Lookup a transaction by the ID of an event that appears within it.
     *
     * Returns NOT_FOUND if no such transaction exists.
     */
    getTransactionByEventId(requestObject: GetTransactionByEventIdRequest): Promise<GetTransactionResponse>
    getTransactionByEventId(requestObject: GetTransactionByEventIdRequest, callback: Callback<GetTransactionResponse>): ClientCancellableCall

    /**
     * Lookup a transaction by the ID of an event that appears within it.
     *
     * Returns ``NOT_FOUND`` if no such transaction exists.
     */
    getFlatTransactionByEventId(requestObject: GetTransactionByEventIdRequest): Promise<GetFlatTransactionResponse>
    getFlatTransactionByEventId(requestObject: GetTransactionByEventIdRequest, callback: Callback<GetFlatTransactionResponse>): ClientCancellableCall

    /**
     * Lookup a transaction by its ID.
     *
     * Returns NOT_FOUND if no such transaction exists.
     */
    getTransactionById(requestObject: GetTransactionByIdRequest): Promise<GetTransactionResponse>
    getTransactionById(requestObject: GetTransactionByIdRequest, callback: Callback<GetTransactionResponse>): ClientCancellableCall

    /**
     * Lookup a transaction by the ID of an event that appears within it.
     *
     * Returns ``NOT_FOUND`` if no such transaction exists.
     */
    getFlatTransactionById(requestObject: GetTransactionByIdRequest): Promise<GetFlatTransactionResponse>
    getFlatTransactionById(requestObject: GetTransactionByIdRequest, callback: Callback<GetFlatTransactionResponse>): ClientCancellableCall

    /**
     * Read the ledger's filtered transaction stream for a set of parties.
     */
    getTransactions(requestObject: GetTransactionsRequest): ClientReadableObjectStream<GetTransactionsResponse>

    /**
     * Read the ledger's complete transaction stream for a set of parties.
     *
     * This call is a future extension point and is currently not supported.
     */
    getTransactionTrees(requestObject: GetTransactionsRequest): ClientReadableObjectStream<GetTransactionTreesResponse>

}
