// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {SubmitRequestValidation} from "../validation/SubmitRequestValidation";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {Callback, justForward, promisify} from "../util/Callback";
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

    private submitCallback(requestObject: SubmitRequest, callback: Callback<null>): ClientCancellableCall {
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

    private submitPromise: (requestObject: SubmitRequest) => Promise<null> = promisify(this.submitCallback)

    submit(requestObject: SubmitRequest): Promise<null>
    submit(requestObject: SubmitRequest, callback: Callback<null>): ClientCancellableCall
    submit(requestObject: SubmitRequest, callback?: Callback<null>): ClientCancellableCall | Promise<null> {
        return callback ? this.submitCallback(requestObject, callback) : this.submitPromise(requestObject);
    }

}
