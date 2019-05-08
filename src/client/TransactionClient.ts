// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ITransactionServiceClient} from "../generated/com/digitalasset/ledger/api/v1/transaction_service_grpc_pb";
import {ValidationReporter} from "../reporting/ValidationReporter";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {GetLedgerEndRequest} from "../generated/com/digitalasset/ledger/api/v1/transaction_service_pb";
import {GetLedgerEndResponse} from "../model/GetLedgerEndResponse";
import {Callback, forward} from "../util/Callback";
import {GetLedgerEndResponseCodec} from "../codec/GetLedgerEndResponseCodec";
import {GetTransactionResponse} from "../model/GetTransactionResponse";
import {GetTransactionByEventIdRequest} from "../model/GetTransactionByEventIdRequest";
import {GetTransactionByEventIdRequestValidation} from "../validation/GetTransactionByEventIdRequestValidation";
import {isValid} from "../validation/Validation";
import {GetTransactionByEventIdRequestCodec} from "../codec/GetTransactionByEventIdRequestCodec";
import {GetTransactionResponseCodec} from "../codec/GetTransactionResponseCodec";
import {GetTransactionByIdRequestCodec} from "../codec/GetTransactionByIdRequestCodec";
import {GetTransactionByIdRequest} from "../model/GetTransactionByIdRequest";
import {GetTransactionsRequestValidation} from "../validation/GetTransactionsRequestValidation";
import {GetTransactionsResponse} from "../model/GetTransactionsResponse";
import {ClientReadableObjectStream} from "../call/ClientReadableObjectStream";
import {GetTransactionsRequest} from "../model/GetTransactionsRequest";
import {GetTransactionsRequestCodec} from "../codec/GetTransactionsRequestCodec";
import {GetTransactionsResponseCodec} from "../codec/GetTransactionsResponseCodec";
import {GetTransactionTreesResponse} from "../model/GetTransactionTreesResponse";
import {GetTransactionTreesResponseCodec} from "../codec/GetTransactionTreesResponseCodec";

/**
 * Allows clients to read transactions from the ledger.
 */
export class TransactionClient {

    private readonly ledgerId: string;
    private readonly client: ITransactionServiceClient;
    private readonly reporter: ValidationReporter;

    constructor(ledgerId: string, client: ITransactionServiceClient, reporter: ValidationReporter) {
        this.ledgerId = ledgerId;
        this.client = client;
        this.reporter = reporter;
    }

    /**
     * Get the current ledger end.
     *
     * Subscriptions started with the returned offset will serve transactions
     * created after this RPC was called.
     */
    getLedgerEnd(callback: Callback<GetLedgerEndResponse>): ClientCancellableCall {
        const request = new GetLedgerEndRequest();
        request.setLedgerId(this.ledgerId);
        return ClientCancellableCall.accept(this.client.getLedgerEnd(request, (error, response) => {
            forward(callback, error, response, GetLedgerEndResponseCodec.deserialize);
        }));
    }

    /**
     * Lookup a transaction by the ID of an event that appears within it.
     *
     * This call is a future extension point and is currently not supported.
     *
     * Returns NOT_FOUND if no such transaction exists.
     */
    getTransactionByEventId(requestObject: GetTransactionByEventIdRequest, callback: Callback<GetTransactionResponse>): ClientCancellableCall {
        const tree = GetTransactionByEventIdRequestValidation.validate(requestObject);
        if (isValid(tree)) {
            const request = GetTransactionByEventIdRequestCodec.serialize(requestObject);
            request.setLedgerId(this.ledgerId);
            return ClientCancellableCall.accept(this.client.getTransactionByEventId(request, (error, response) => {
                forward(callback, error, response, GetTransactionResponseCodec.deserialize);
            }));
        } else {
            setImmediate(() => callback(new Error(this.reporter.render(tree))));
            return ClientCancellableCall.rejected;
        }
    }

    /**
     * Lookup a transaction by its ID.
     *
     * This call is a future extension point and is currently not supported.
     *
     * Returns NOT_FOUND if no such transaction exists.
     */
    getTransactionById(requestObject: GetTransactionByIdRequest, callback: Callback<GetTransactionResponse>): ClientCancellableCall {
        const request = GetTransactionByIdRequestCodec.serialize(requestObject);
        request.setLedgerId(this.ledgerId);
        return ClientCancellableCall.accept(this.client.getTransactionById(request, (error, response) => {
            forward(callback, error, response, GetTransactionResponseCodec.deserialize);
        }));
    }

    /**
     * Read the ledger's filtered transaction stream for a set of parties.
     */
    getTransactions(requestObject: GetTransactionsRequest): ClientReadableObjectStream<GetTransactionsResponse> {
        const tree = GetTransactionsRequestValidation.validate(requestObject);
        if (isValid(tree)) {
            const request = GetTransactionsRequestCodec.serialize(requestObject);
            request.setLedgerId(this.ledgerId);
            if (requestObject.verbose === undefined) {
                request.setVerbose(true);
            }
            return ClientReadableObjectStream.from(this.client.getTransactions(request), GetTransactionsResponseCodec);
        } else {
            return ClientReadableObjectStream.from(new Error(this.reporter.render(tree)));
        }
    }

    /**
     * Read the ledger's complete transaction stream for a set of parties.
     *
     * This call is a future extension point and is currently not supported.
     */
    getTransactionTrees(requestObject: GetTransactionsRequest): ClientReadableObjectStream<GetTransactionTreesResponse> {
        const tree = GetTransactionsRequestValidation.validate(requestObject);
        if (isValid(tree)) {
            const request = GetTransactionsRequestCodec.serialize(requestObject);
            request.setLedgerId(this.ledgerId);
            return ClientReadableObjectStream.from(this.client.getTransactionTrees(request), GetTransactionTreesResponseCodec);
        } else {
            return ClientReadableObjectStream.from(new Error(this.reporter.render(tree)));
        }
    }

}
