// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {IActiveContractsServiceClient} from '../generated/com/daml/ledger/api/v1/active_contracts_service_grpc_pb';
import {GetActiveContractsRequest} from "../model/GetActiveContractsRequest";
import {ClientReadableObjectStream} from "../call/ClientReadableObjectStream";
import {GetActiveContractsResponse} from "../model/GetActiveContractsResponse";
import {GetActiveContractsRequestValidation} from "../validation/GetActiveContractsRequestValidation";
import {isValid} from "../validation/Validation";
import {GetActiveContractsResponseCodec} from "../codec/GetActiveContractsResponseCodec";
import {GetActiveContractsRequestCodec} from "../codec/GetActiveContractsRequestCodec";
import {ValidationReporter} from "../reporting/ValidationReporter";
import {ActiveContractsClient} from "./ActiveContractsClient";

export class NodeJsActiveContractsClient implements ActiveContractsClient {

    private readonly ledgerId: string;
    private readonly client: IActiveContractsServiceClient;
    private readonly reporter: ValidationReporter;

    constructor(ledgerId: string, client: IActiveContractsServiceClient, reporter: ValidationReporter) {
        this.ledgerId = ledgerId;
        this.client = client;
        this.reporter = reporter;
    }

    getActiveContracts(requestObject: GetActiveContractsRequest): ClientReadableObjectStream<GetActiveContractsResponse> {
        const tree = GetActiveContractsRequestValidation.validate(requestObject);
        if (isValid(tree)) {
            const request = GetActiveContractsRequestCodec.serialize(requestObject);
            request.setLedgerId(this.ledgerId);
            if (requestObject.verbose === undefined) {
                request.setVerbose(true);
            }
            return ClientReadableObjectStream.from(this.client.getActiveContracts(request), GetActiveContractsResponseCodec);
        } else {
            return ClientReadableObjectStream.from(new Error(this.reporter.render(tree)));
        }
    }

}