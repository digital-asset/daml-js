// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ICommandCompletionServiceClient} from "../generated/com/digitalasset/ledger/api/v1/command_completion_service_grpc_pb";
import {ValidationReporter} from "../reporting/ValidationReporter";
import {CompletionEndRequest} from "../generated/com/digitalasset/ledger/api/v1/command_completion_service_pb";
import {ClientReadableObjectStream} from "../call/ClientReadableObjectStream";
import {CompletionStreamResponse} from "../model/CompletionStreamResponse";
import {CompletionStreamRequestValidation} from "../validation/CompletionStreamRequestValidation";
import {Callback, forward} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {CompletionEndResponseCodec} from "../codec/CompletionEndResponseCodec";
import {CompletionEndResponse} from "../model/CompletionEndResponse";
import {CompletionStreamResponseCodec} from "../codec/CompletionStreamResponseCodec";
import {isValid} from "../validation/Validation";
import {CompletionStreamRequestCodec} from "../codec/CompletionStreamRequestCodec";
import {CompletionStreamRequest} from "../model/CompletionStreamRequest";

/**
 * Allows clients to observe the status of their submissions.
 *
 * CommandsValidation may be submitted via the Command Submission Service.
 *
 * The on-ledger effects of their submissions are disclosed by the
 * TransactionValidation Service.
 *
 * CommandsValidation may fail in 4 distinct manners:
 *
 * 1. INVALID_PARAMETER gRPC error on malformed payloads and missing
 *    required fields.
 *
 * 2. Failure communicated in the SubmitResponse.
 *
 * 3. Failure communicated in a CompletionValidation.
 *
 * 4. A Checkpoint with record_time &gt; command mrt arrives through the
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
 * one if the context was missing) on both the CompletionValidation and TransactionValidation streams.
 */
export class CommandCompletionClient {

    private readonly completionEndRequest: CompletionEndRequest;
    private readonly client: ICommandCompletionServiceClient;
    private readonly ledgerId: string;
    private readonly reporter: ValidationReporter

    constructor(ledgerId: string, client: ICommandCompletionServiceClient, reporter: ValidationReporter) {
        this.completionEndRequest = new CompletionEndRequest();
        this.completionEndRequest.setLedgerId(ledgerId);
        this.ledgerId = ledgerId;
        this.client = client;
        this.reporter = reporter;
    }

    /**
     * Subscribe to command completion events.
     */
    completionStream(requestObject: CompletionStreamRequest): ClientReadableObjectStream<CompletionStreamResponse> {
        const tree = CompletionStreamRequestValidation.validate(requestObject);
        if (isValid(tree)) {
            const request = CompletionStreamRequestCodec.serialize(requestObject);
            request.setLedgerId(this.ledgerId);
            return ClientReadableObjectStream.from(this.client.completionStream(request), CompletionStreamResponseCodec);
        } else {
            return ClientReadableObjectStream.from(new Error(this.reporter.render(tree)));
        }
    }

    /**
     * Returns the offset after the latest completion.
     */
    completionEnd(callback: Callback<CompletionEndResponse>): ClientCancellableCall {
        return ClientCancellableCall.accept(this.client.completionEnd(this.completionEndRequest, (error, response) => {
            forward(callback, error, response, CompletionEndResponseCodec.deserialize);
        }));
    }

}