// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {SetTimeRequestValidation} from "../validation/SetTimeRequestValidation";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {Callback, justForward} from "../util/Callback";
import {SetTimeRequest} from "../model/SetTimeRequest";
import {ClientReadableObjectStream} from "../call/ClientReadableObjectStream";
import {GetTimeResponse} from "../model/GetTimeResponse";
import {isValid} from "../validation/Validation";
import {GetTimeResponseCodec} from "../codec/GetTimeResponseCodec";
import {SetTimeRequestCodec} from "../codec/SetTimeRequestCodec";
import {GetTimeRequest} from "../generated/com/digitalasset/ledger/api/v1/testing/time_service_pb";
import {ITimeServiceClient} from "../generated/com/digitalasset/ledger/api/v1/testing/time_service_grpc_pb";
import {ValidationReporter} from "../reporting/ValidationReporter";

/**
 * OptionalFieldsValidators service, exposed for testing static time scenarios.
 */
export class TimeClient {

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

    /**
     * Returns a stream of time updates.
     *
     * Always returns at least one response, where the first one is the current
     * time.
     *
     * Subsequent responses are emitted whenever the ledger server's time is
     * updated.
     */
    getTime(): ClientReadableObjectStream<GetTimeResponse> {
        return ClientReadableObjectStream.from(this.client.getTime(this.request), GetTimeResponseCodec);
    }

    /**
     * Allows clients to change the ledger's clock in an atomic get-and-set
     * operation.
     */
    setTime(requestObject: SetTimeRequest, callback: Callback<null>): ClientCancellableCall {
        const tree = SetTimeRequestValidation.validate(requestObject);
        if (isValid(tree)) {
            const request = SetTimeRequestCodec.serialize(requestObject);
            request.setLedgerId(this.ledgerId);
            return ClientCancellableCall.accept(this.client.setTime(request, (error, _) => {
                justForward(callback, error, null)
            }));
        } else {
            setImmediate(() => {
                callback(new Error(this.reporter.render(tree)));
            });
            return ClientCancellableCall.rejected;
        }
    }

}