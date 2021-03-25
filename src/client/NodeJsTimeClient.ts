// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {SetTimeRequestValidation} from "../validation/SetTimeRequestValidation";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {Callback, forwardVoidResponse, promisify} from "../util/Callback";
import {SetTimeRequest} from "../model/SetTimeRequest";
import {ClientReadableObjectStream} from "../call/ClientReadableObjectStream";
import {GetTimeResponse} from "../model/GetTimeResponse";
import {isValid} from "../validation/Validation";
import {GetTimeResponseCodec} from "../codec/GetTimeResponseCodec";
import {SetTimeRequestCodec} from "../codec/SetTimeRequestCodec";
import {GetTimeRequest} from "../generated/com/daml/ledger/api/v1/testing/time_service_pb";
import {ITimeServiceClient} from "../generated/com/daml/ledger/api/v1/testing/time_service_grpc_pb";
import {ValidationReporter} from "../reporting/ValidationReporter";

export class NodeJsTimeClient {

    private readonly ledgerId: string;
    private readonly request: GetTimeRequest;
    private readonly client: ITimeServiceClient;
    private readonly reporter: ValidationReporter;

    constructor(ledgerId: string, client: ITimeServiceClient, reporter: ValidationReporter) {
        this.ledgerId = ledgerId;
        this.request = new GetTimeRequest();
        this.request.setLedgerId(this.ledgerId);
        this.client = client;
        this.reporter = reporter;
    }

    getTime(): ClientReadableObjectStream<GetTimeResponse> {
        return ClientReadableObjectStream.from(this.client.getTime(this.request), GetTimeResponseCodec);
    }

    private setTimeCallback(requestObject: SetTimeRequest, callback: Callback<void>): ClientCancellableCall {
        const tree = SetTimeRequestValidation.validate(requestObject);
        if (isValid(tree)) {
            const request = SetTimeRequestCodec.serialize(requestObject);
            request.setLedgerId(this.ledgerId);
            return ClientCancellableCall.accept(this.client.setTime(request, (error, _) => {
                forwardVoidResponse(callback, error);
            }));
        } else {
            setImmediate(() => {
                callback(new Error(this.reporter.render(tree)));
            });
            return ClientCancellableCall.rejected;
        }
    }

    private setTimePromise: (requestObject: SetTimeRequest) => Promise<void> = promisify(this.setTimeCallback);

    setTime(requestObject: SetTimeRequest): Promise<void>
    setTime(requestObject: SetTimeRequest, callback: Callback<void>): ClientCancellableCall
    setTime(requestObject: SetTimeRequest, callback?: Callback<void>): ClientCancellableCall | Promise<void> {
        return callback ? this.setTimeCallback(requestObject, callback) : this.setTimePromise(requestObject);
    }

}