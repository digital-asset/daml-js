// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {SubmitRequestValidation} from "../validation/SubmitRequestValidation";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {Callback, forwardVoidResponse, promisify} from "../util/Callback";
import {ValidationReporter} from "../reporting/ValidationReporter";
import {ICommandSubmissionServiceClient} from "../generated/com/digitalasset/ledger/api/v1/command_submission_service_grpc_pb";
import {SubmitRequest} from "../model/SubmitRequest";
import {isValid} from "../validation/Validation";
import {SubmitRequestCodec} from "../codec/SubmitRequestCodec";
import {CommandSubmissionClient} from "./CommandSubmissionClient";

export class NodeJsCommandSubmissionClient implements CommandSubmissionClient {

    private readonly ledgerId: string;
    private readonly client: ICommandSubmissionServiceClient;
    private readonly reporter: ValidationReporter;

    constructor(ledgerId: string, client: ICommandSubmissionServiceClient, reporter: ValidationReporter) {
        this.ledgerId = ledgerId;
        this.client = client;
        this.reporter = reporter;
    }

    private submitCallback(requestObject: SubmitRequest, callback: Callback<void>): ClientCancellableCall {
        const tree = SubmitRequestValidation.validate(requestObject);
        if (isValid(tree)) {
            const request = SubmitRequestCodec.serialize(requestObject);
            if (request.hasCommands()) {
                request.getCommands()!.setLedgerId(this.ledgerId);
            }
            return ClientCancellableCall.accept(this.client.submit(request, (error, _) => {
                forwardVoidResponse(callback, error);
            }));
        } else {
            setImmediate(() => callback(new Error(this.reporter.render(tree))));
            return ClientCancellableCall.rejected;
        }
    }

    private submitPromise: (requestObject: SubmitRequest) => Promise<void> = promisify(this.submitCallback)

    submit(requestObject: SubmitRequest): Promise<void>
    submit(requestObject: SubmitRequest, callback: Callback<void>): ClientCancellableCall
    submit(requestObject: SubmitRequest, callback?: Callback<void>): ClientCancellableCall | Promise<void> {
        return callback ? this.submitCallback(requestObject, callback) : this.submitPromise(requestObject);
    }

}
