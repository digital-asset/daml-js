// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Callback, forward, justForward} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {ICommandServiceClient} from "../generated/com/digitalasset/ledger/api/v1/command_service_grpc_pb";
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

/**
 * Command Service is able to correlate submitted commands with completion
 * ledger, identify timeouts, and return contextual information with each
 * tracking result. This supports the implementation of stateless clients.
 */
export class CommandClient {

    private readonly ledgerId: string;
    private readonly client: ICommandServiceClient;
    private readonly reporter: ValidationReporter;

    constructor(ledgerId: string, client: ICommandServiceClient, reporter: ValidationReporter) {
        this.ledgerId = ledgerId;
        this.client = client;
        this.reporter = reporter;
    }

    /**
     * Submits a single composite command and waits for its result.
     *
     * Returns RESOURCE_EXHAUSTED if the number of in-flight commands reached
     * the maximum (if a limit is configured).
     *
     * Propagates the gRPC error of failed submissions including DAML
     * interpretation errors.
     */
    submitAndWait(requestObject: SubmitAndWaitRequest, callback: Callback<null>): ClientCancellableCall {
        const tree = SubmitAndWaitRequestValidation.validate(requestObject);
        if (isValid(tree)) {
            const request = SubmitAndWaitRequestCodec.serialize(requestObject);
            request.getCommands()!.setLedgerId(this.ledgerId);
            return ClientCancellableCall.accept(this.client.submitAndWait(request, (error, _) => {
                justForward(callback, error, null)
            }));
        } else {
            setImmediate(() => callback(new Error(this.reporter.render(tree))));
            return ClientCancellableCall.rejected;
        }
    }

    /**
     * Submits a single composite command, waits for its result, and returns the transaction.
     *
     * Returns ``RESOURCE_EXHAUSTED`` if the number of in-flight commands reached the maximum (if a limit is configured).
     *
     * Propagates the gRPC error of failed submissions including DAML interpretation errors.
     */
    submitAndWaitForTransaction(requestObject: SubmitAndWaitRequest, callback: Callback<SubmitAndWaitForTransactionResponse>): ClientCancellableCall {
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

    /**
     * Submits a single composite command, waits for its result, and returns the transaction id.
     *
     * Returns ``RESOURCE_EXHAUSTED`` if the number of in-flight commands reached the maximum (if a limit is configured).
     *
     * Propagates the gRPC error of failed submissions including DAML interpretation errors.
     */
    submitAndWaitForTransactionId(requestObject: SubmitAndWaitRequest, callback: Callback<SubmitAndWaitForTransactionIdResponse>): ClientCancellableCall {
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

    /**
     * Submits a single composite command, waits for its result, and returns the transaction tree.
     *
     * Returns ``RESOURCE_EXHAUSTED`` if the number of in-flight commands reached the maximum (if a limit is configured).
     *
     * Propagates the gRPC error of failed submissions including DAML interpretation errors.
     */
    submitAndWaitForTransactionTree(requestObject: SubmitAndWaitRequest, callback: Callback<SubmitAndWaitForTransactionTreeResponse>): ClientCancellableCall {
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

}