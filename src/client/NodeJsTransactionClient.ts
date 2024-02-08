// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ITransactionServiceClient} from "../generated/com/daml/ledger/api/v1/transaction_service_grpc_pb";
import {ValidationReporter} from "../reporting/ValidationReporter";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {GetLedgerEndRequest} from "../generated/com/daml/ledger/api/v1/transaction_service_pb";
import {GetLedgerEndResponse} from "../model/GetLedgerEndResponse";
import {Callback, forward, promisify} from "../util/Callback";
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
import {GetFlatTransactionResponse} from "../model/GetFlatTransactionResponse";
import {GetFlatTransactionResponseCodec} from "../codec/GetFlatTransactionResponseCodec";
import {GetTransactionByIdRequestValidation} from "../validation/GetTransactionByIdRequestValidation";

export class NodeJsTransactionClient {

    private readonly ledgerId: string;
    private readonly client: ITransactionServiceClient;
    private readonly reporter: ValidationReporter;

    constructor(ledgerId: string, client: ITransactionServiceClient, reporter: ValidationReporter) {
        this.ledgerId = ledgerId;
        this.client = client;
        this.reporter = reporter;
    }

    private getLedgerEndCallback(callback: Callback<GetLedgerEndResponse>): ClientCancellableCall {
        const request = new GetLedgerEndRequest();
        request.setLedgerId(this.ledgerId);
        return ClientCancellableCall.accept(this.client.getLedgerEnd(request, (error, response) => {
            forward(callback, error, response, GetLedgerEndResponseCodec.deserialize);
        }));
    }

    private getLedgerEndPromise: () => Promise<GetLedgerEndResponse> = promisify(this.getLedgerEndCallback);

    getLedgerEnd(): Promise<GetLedgerEndResponse>
    getLedgerEnd(callback: Callback<GetLedgerEndResponse>): ClientCancellableCall
    getLedgerEnd(callback?: Callback<GetLedgerEndResponse>): ClientCancellableCall | Promise<GetLedgerEndResponse> {
        return callback ? this.getLedgerEndCallback(callback) : this.getLedgerEndPromise();
    }

    private getTransactionByEventIdCallback(requestObject: GetTransactionByEventIdRequest, callback: Callback<GetTransactionResponse>): ClientCancellableCall {
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

    private getTransactionByEventIdPromise: (requestObject: GetTransactionByEventIdRequest) => Promise<GetTransactionResponse> = promisify(this.getTransactionByEventIdCallback);

    getTransactionByEventId(requestObject: GetTransactionByEventIdRequest): Promise<GetTransactionResponse>
    getTransactionByEventId(requestObject: GetTransactionByEventIdRequest, callback: Callback<GetTransactionResponse>): ClientCancellableCall
    getTransactionByEventId(requestObject: GetTransactionByEventIdRequest, callback?: Callback<GetTransactionResponse>): ClientCancellableCall | Promise<GetTransactionResponse> {
        return callback ? this.getTransactionByEventIdCallback(requestObject, callback) : this.getTransactionByEventIdPromise(requestObject);
    }

    private getFlatTransactionByEventIdCallback(requestObject: GetTransactionByEventIdRequest, callback: Callback<GetFlatTransactionResponse>): ClientCancellableCall {
        const tree = GetTransactionByEventIdRequestValidation.validate(requestObject);
        if (isValid(tree)) {
            const request = GetTransactionByEventIdRequestCodec.serialize(requestObject);
            request.setLedgerId(this.ledgerId);
            return ClientCancellableCall.accept(this.client.getFlatTransactionByEventId(request, (error, response) => {
                forward(callback, error, response, GetFlatTransactionResponseCodec.deserialize);
            }));
        } else {
            setImmediate(() => callback(new Error(this.reporter.render(tree))));
            return ClientCancellableCall.rejected;
        }
    }

    private getFlatTransactionByEventIdPromise: (requestObject: GetTransactionByEventIdRequest) => Promise<GetFlatTransactionResponse> = promisify(this.getFlatTransactionByEventIdCallback);

    getFlatTransactionByEventId(requestObject: GetTransactionByEventIdRequest): Promise<GetFlatTransactionResponse>
    getFlatTransactionByEventId(requestObject: GetTransactionByEventIdRequest, callback: Callback<GetFlatTransactionResponse>): ClientCancellableCall
    getFlatTransactionByEventId(requestObject: GetTransactionByEventIdRequest, callback?: Callback<GetFlatTransactionResponse>): ClientCancellableCall | Promise<GetFlatTransactionResponse> {
        return callback ? this.getFlatTransactionByEventIdCallback(requestObject, callback) : this.getFlatTransactionByEventIdPromise(requestObject);
    }

    private getTransactionByIdCallback(requestObject: GetTransactionByIdRequest, callback: Callback<GetTransactionResponse>): ClientCancellableCall {
        const tree = GetTransactionByIdRequestValidation.validate(requestObject);
        if (isValid(tree)) {
            const request = GetTransactionByIdRequestCodec.serialize(requestObject);
            request.setLedgerId(this.ledgerId);
            return ClientCancellableCall.accept(this.client.getTransactionById(request, (error, response) => {
                forward(callback, error, response, GetTransactionResponseCodec.deserialize);
            }));
        } else {
            setImmediate(() => callback(new Error(this.reporter.render(tree))));
            return ClientCancellableCall.rejected;
        }
    }

    private getTransactionByIdPromise: (requestObject: GetTransactionByIdRequest) => Promise<GetTransactionResponse> = promisify(this.getTransactionByIdCallback);

    getTransactionById(requestObject: GetTransactionByIdRequest): Promise<GetTransactionResponse>
    getTransactionById(requestObject: GetTransactionByIdRequest, callback: Callback<GetTransactionResponse>): ClientCancellableCall
    getTransactionById(requestObject: GetTransactionByIdRequest, callback?: Callback<GetTransactionResponse>): ClientCancellableCall | Promise<GetTransactionResponse> {
        return callback ? this.getTransactionByIdCallback(requestObject, callback) : this.getTransactionByIdPromise(requestObject);
    }

    private getFlatTransactionByIdCallback(requestObject: GetTransactionByIdRequest, callback: Callback<GetFlatTransactionResponse>): ClientCancellableCall {
        const tree = GetTransactionByIdRequestValidation.validate(requestObject);
        if (isValid(tree)) {
            const request = GetTransactionByIdRequestCodec.serialize(requestObject);
            request.setLedgerId(this.ledgerId);
            return ClientCancellableCall.accept(this.client.getFlatTransactionById(request, (error, response) => {
                forward(callback, error, response, GetFlatTransactionResponseCodec.deserialize);
            }));
        } else {
            setImmediate(() => callback(new Error(this.reporter.render(tree))));
            return ClientCancellableCall.rejected;
        }
    }

    private getFlatTransactionByIdPromise: (requestObject: GetTransactionByIdRequest) => Promise<GetFlatTransactionResponse> = promisify(this.getFlatTransactionByIdCallback);

    getFlatTransactionById(requestObject: GetTransactionByIdRequest): Promise<GetFlatTransactionResponse>
    getFlatTransactionById(requestObject: GetTransactionByIdRequest, callback: Callback<GetFlatTransactionResponse>): ClientCancellableCall
    getFlatTransactionById(requestObject: GetTransactionByIdRequest, callback?: Callback<GetFlatTransactionResponse>): ClientCancellableCall | Promise<GetFlatTransactionResponse> {
        return callback ? this.getFlatTransactionByIdCallback(requestObject, callback) : this.getFlatTransactionByIdPromise(requestObject);
    }

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

    getTransactionTrees(requestObject: GetTransactionsRequest): ClientReadableObjectStream<GetTransactionTreesResponse> {
        const tree = GetTransactionsRequestValidation.validate(requestObject);
        if (isValid(tree)) {
            const request = GetTransactionsRequestCodec.serialize(requestObject);
            request.setLedgerId(this.ledgerId);
            if (requestObject.verbose === undefined) {
                request.setVerbose(true);
            }
            return ClientReadableObjectStream.from(this.client.getTransactionTrees(request), GetTransactionTreesResponseCodec);
        } else {
            return ClientReadableObjectStream.from(new Error(this.reporter.render(tree)));
        }
    }

}
