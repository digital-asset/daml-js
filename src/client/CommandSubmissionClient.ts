// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {SubmitRequestValidation} from "../validation/SubmitRequestValidation";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {Callback, justForward} from "../util/Callback";
import {ValidationReporter} from "../reporting/ValidationReporter";
import {ICommandSubmissionServiceClient} from "../generated/com/digitalasset/ledger/api/v1/command_submission_service_grpc_pb";
import {SubmitRequest} from "../model/SubmitRequest";
import {isValid} from "../validation/Validation";
import {SubmitRequestCodec} from "../codec/SubmitRequestCodec";

/**
 * Allows clients to attempt advancing the ledger's state by submitting
 * commands.
 *
 * The final states of their submissions are disclosed by the Command
 * CompletionValidation Service.
 *
 * The on-ledger effects of their submissions are disclosed by the
 * TransactionValidation Service.
 *
 * CommandsValidation may fail in 4 distinct manners:
 *
 * 1) INVALID_PARAMETER gRPC error on malformed payloads and missing
 *    required fields.
 *
 * 2) Failure communicated in the SubmitResponse.
 *
 * 3) Failure communicated in a CompletionValidation.
 *
 * 4) A Checkoint with record_time &gt; command mrt arrives through the
 *    CompletionValidation Stream, and the command's CompletionValidation was not visible
 *    before. In this case the command is lost.
 *
 * Clients that do not receive a successful completion about their
 * submission MUST NOT assume that it was successful.
 *
 * Clients SHOULD subscribe to the CompletionStream before starting to
 * submit commands to prevent race conditions.
 *
 * Interprocess tracing of command submissions may be achieved via Zipkin
 * by filling out the trace_context field.
 *
 * The server will return a child context of the submitted one, (or a new
 * one if the context was missing) on both the CompletionValidation and TransactionValidation
 * streams.
 */
export class CommandSubmissionClient {

    private readonly ledgerId: string;
    private readonly client: ICommandSubmissionServiceClient;
    private readonly reporter: ValidationReporter;

    constructor(ledgerId: string, client: ICommandSubmissionServiceClient, reporter: ValidationReporter) {
        this.ledgerId = ledgerId;
        this.client = client;
        this.reporter = reporter;
    }

    /**
     * Submit a single composite command.
     */
    submit(requestObject: SubmitRequest, callback: Callback<null>): ClientCancellableCall {
        const tree = SubmitRequestValidation.validate(requestObject);
        if (isValid(tree)) {
            const request = SubmitRequestCodec.serialize(requestObject);
            if (request.hasCommands()) {
                request.getCommands()!.setLedgerId(this.ledgerId);
            }
            return ClientCancellableCall.accept(this.client.submit(request, (error, _) => {
                justForward(callback, error, null);
            }));
        } else {
            setImmediate(() => callback(new Error(this.reporter.render(tree))));
            return ClientCancellableCall.rejected;
        }
    }

}
