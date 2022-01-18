// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ICommandCompletionServiceClient} from "../generated/com/daml/ledger/api/v1/command_completion_service_grpc_pb";
import {ValidationReporter} from "../reporting/ValidationReporter";
import {CompletionEndRequest} from "../generated/com/daml/ledger/api/v1/command_completion_service_pb";
import {ClientReadableObjectStream} from "../call/ClientReadableObjectStream";
import {CompletionStreamResponse} from "../model/CompletionStreamResponse";
import {CompletionStreamRequestValidation} from "../validation/CompletionStreamRequestValidation";
import {Callback, forward, promisify} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {CompletionEndResponseCodec} from "../codec/CompletionEndResponseCodec";
import {CompletionEndResponse} from "../model/CompletionEndResponse";
import {CompletionStreamResponseCodec} from "../codec/CompletionStreamResponseCodec";
import {isValid} from "../validation/Validation";
import {CompletionStreamRequestCodec} from "../codec/CompletionStreamRequestCodec";
import {CompletionStreamRequest} from "../model/CompletionStreamRequest";
import {CommandCompletionClient} from "./CommandCompletionClient";

export class NodeJsCommandCompletionClient implements CommandCompletionClient {

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

    private completionEndCallback(callback: Callback<CompletionEndResponse>): ClientCancellableCall {
        return ClientCancellableCall.accept(this.client.completionEnd(this.completionEndRequest, (error, response) => {
            forward(callback, error, response, CompletionEndResponseCodec.deserialize);
        }));
    }

    private completionEndPromise: () => Promise<CompletionEndResponse> = promisify(this.completionEndCallback)

    completionEnd(): Promise<CompletionEndResponse>
    completionEnd(callback: Callback<CompletionEndResponse>): ClientCancellableCall
    completionEnd(callback?: Callback<CompletionEndResponse>): ClientCancellableCall | Promise<CompletionEndResponse> {
        return callback ? this.completionEndCallback(callback) : this.completionEndPromise();
    }

}