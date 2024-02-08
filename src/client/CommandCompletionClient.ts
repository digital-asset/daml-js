// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ClientReadableObjectStream} from "../call/ClientReadableObjectStream";
import {CompletionStreamResponse} from "../model/CompletionStreamResponse";
import {Callback} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {CompletionEndResponse} from "../model/CompletionEndResponse";
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
export interface CommandCompletionClient {

    /**
     * Subscribe to command completion events.
     */
    completionStream(requestObject: CompletionStreamRequest): ClientReadableObjectStream<CompletionStreamResponse>

    /**
     * Returns the offset after the latest completion.
     */
    completionEnd(): Promise<CompletionEndResponse>
    completionEnd(callback: Callback<CompletionEndResponse>): ClientCancellableCall

}