// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Callback, forward, forwardVoidResponse, promisify} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {ICommandServiceClient} from "../generated/com/daml/ledger/api/v1/command_service_grpc_pb";
import {ValidationReporter} from "../reporting/ValidationReporter";
import {SubmitAndWaitRequest} from "../model/SubmitAndWaitRequest";
import {SubmitAndWaitRequestValidation} from "../validation/SubmitAndWaitRequestValidation";
import {isValid} from "../validation/Validation";
import {SubmitAndWaitRequestCodec} from "../codec/SubmitAndWaitRequestCodec";
import {SubmitAndWaitForTransactionResponse} from "../model/SubmitAndWaitForTransactionResponse";
import {SubmitAndWaitForTransactionResponseCodec} from "../codec/SubmitAndWaitForTransactionResponseCodec";
import {SubmitAndWaitForTransactionIdResponse} from "../model/SubmitAndWaitForTransactionIdResponse";
import {SubmitAndWaitForTransactionIdResponseCodec} from "../codec/SubmitAndWaitForTransactionIdResponseCodec";
import {SubmitAndWaitForTransactionTreeResponse} from "../model/SubmitAndWaitForTransactionTreeResponse";
import {SubmitAndWaitForTransactionTreeResponseCodec} from "../codec/SubmitAndWaitForTransactionTreeResponseCodec";
import {CommandClient} from "./CommandClient";

export class NodeJsCommandClient implements CommandClient {

    private readonly ledgerId: string;
    private readonly client: ICommandServiceClient;
    private readonly reporter: ValidationReporter;

    constructor(ledgerId: string, client: ICommandServiceClient, reporter: ValidationReporter) {
        this.ledgerId = ledgerId;
        this.client = client;
        this.reporter = reporter;
    }

    private submitAndWaitCallback(requestObject: SubmitAndWaitRequest, callback: Callback<void>) {
        const tree = SubmitAndWaitRequestValidation.validate(requestObject);
        if (isValid(tree)) {
            const request = SubmitAndWaitRequestCodec.serialize(requestObject);
            request.getCommands()!.setLedgerId(this.ledgerId);
            return ClientCancellableCall.accept(this.client.submitAndWait(request, (error, _) => {
                forwardVoidResponse(callback, error);
            }));
        } else {
            setImmediate(() => callback(new Error(this.reporter.render(tree))));
            return ClientCancellableCall.rejected;
        }
    };

    private submitAndWaitPromise: (requestObject: SubmitAndWaitRequest) => Promise<void> = promisify(this.submitAndWaitCallback);

    submitAndWait(requestObject: SubmitAndWaitRequest): Promise<void>
    submitAndWait(requestObject: SubmitAndWaitRequest, callback: Callback<void>): ClientCancellableCall
    submitAndWait(requestObject: SubmitAndWaitRequest, callback?: Callback<void>): ClientCancellableCall | Promise<void> {
        return callback ? this.submitAndWaitCallback(requestObject, callback) : this.submitAndWaitPromise(requestObject);
    }

    private submitAndWaitForTransactionCallback(requestObject: SubmitAndWaitRequest, callback: Callback<SubmitAndWaitForTransactionResponse>): ClientCancellableCall {
        const tree = SubmitAndWaitRequestValidation.validate(requestObject);
        if (isValid(tree)) {
            const request = SubmitAndWaitRequestCodec.serialize(requestObject);
            request.getCommands()!.setLedgerId(this.ledgerId);
            return ClientCancellableCall.accept(this.client.submitAndWaitForTransaction(request, (error, response) => {
                forward(callback, error, response, SubmitAndWaitForTransactionResponseCodec.deserialize);
            }));
        } else {
            setImmediate(() => callback(new Error(this.reporter.render(tree))));
            return ClientCancellableCall.rejected;
        }

    }

    private submitAndWaitForTransactionPromise: (requestObject: SubmitAndWaitRequest) => Promise<SubmitAndWaitForTransactionResponse> = promisify(this.submitAndWaitForTransactionCallback);

    submitAndWaitForTransaction(requestObject: SubmitAndWaitRequest): Promise<SubmitAndWaitForTransactionResponse>
    submitAndWaitForTransaction(requestObject: SubmitAndWaitRequest, callback: Callback<SubmitAndWaitForTransactionResponse>): ClientCancellableCall
    submitAndWaitForTransaction(requestObject: SubmitAndWaitRequest, callback?: Callback<SubmitAndWaitForTransactionResponse>): ClientCancellableCall | Promise<SubmitAndWaitForTransactionResponse> {
        return callback ? this.submitAndWaitForTransactionCallback(requestObject, callback) : this.submitAndWaitForTransactionPromise(requestObject);
    }

    private submitAndWaitForTransactionIdCallback(requestObject: SubmitAndWaitRequest, callback: Callback<SubmitAndWaitForTransactionIdResponse>): ClientCancellableCall {
        const tree = SubmitAndWaitRequestValidation.validate(requestObject);
        if (isValid(tree)) {
            const request = SubmitAndWaitRequestCodec.serialize(requestObject);
            request.getCommands()!.setLedgerId(this.ledgerId);
            return ClientCancellableCall.accept(this.client.submitAndWaitForTransactionId(request, (error, response) => {
                forward(callback, error, response, SubmitAndWaitForTransactionIdResponseCodec.deserialize);
            }));
        } else {
            setImmediate(() => callback(new Error(this.reporter.render(tree))));
            return ClientCancellableCall.rejected;
        }
    }

    private submitAndWaitForTransactionIdPromise: (requestObject: SubmitAndWaitRequest) => Promise<SubmitAndWaitForTransactionIdResponse> = promisify(this.submitAndWaitForTransactionIdCallback);

    submitAndWaitForTransactionId(requestObject: SubmitAndWaitRequest): Promise<SubmitAndWaitForTransactionIdResponse>
    submitAndWaitForTransactionId(requestObject: SubmitAndWaitRequest, callback: Callback<SubmitAndWaitForTransactionIdResponse>): ClientCancellableCall
    submitAndWaitForTransactionId(requestObject: SubmitAndWaitRequest, callback?: Callback<SubmitAndWaitForTransactionIdResponse>): ClientCancellableCall | Promise<SubmitAndWaitForTransactionIdResponse> {
        return callback ? this.submitAndWaitForTransactionIdCallback(requestObject, callback) : this.submitAndWaitForTransactionIdPromise(requestObject);
    }

    private submitAndWaitForTransactionTreeCallback(requestObject: SubmitAndWaitRequest, callback: Callback<SubmitAndWaitForTransactionTreeResponse>): ClientCancellableCall {
        const tree = SubmitAndWaitRequestValidation.validate(requestObject);
        if (isValid(tree)) {
            const request = SubmitAndWaitRequestCodec.serialize(requestObject);
            request.getCommands()!.setLedgerId(this.ledgerId);
            return ClientCancellableCall.accept(this.client.submitAndWaitForTransactionTree(request, (error, response) => {
                forward(callback, error, response, SubmitAndWaitForTransactionTreeResponseCodec.deserialize);
            }));
        } else {
            setImmediate(() => callback(new Error(this.reporter.render(tree))));
            return ClientCancellableCall.rejected;
        }
    }

    private submitAndWaitForTransactionTreePromise: (requestObject: SubmitAndWaitRequest) => Promise<SubmitAndWaitForTransactionTreeResponse> = promisify(this.submitAndWaitForTransactionTreeCallback);

    submitAndWaitForTransactionTree(requestObject: SubmitAndWaitRequest): Promise<SubmitAndWaitForTransactionTreeResponse>
    submitAndWaitForTransactionTree(requestObject: SubmitAndWaitRequest, callback: Callback<SubmitAndWaitForTransactionTreeResponse>): ClientCancellableCall
    submitAndWaitForTransactionTree(requestObject: SubmitAndWaitRequest, callback?: Callback<SubmitAndWaitForTransactionTreeResponse>): ClientCancellableCall | Promise<SubmitAndWaitForTransactionTreeResponse> {
        return callback ? this.submitAndWaitForTransactionTreeCallback(requestObject, callback) : this.submitAndWaitForTransactionTreePromise(requestObject);
    }

}