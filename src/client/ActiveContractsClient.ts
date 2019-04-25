// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {IActiveContractsServiceClient} from '../generated/com/digitalasset/ledger/api/v1/active_contracts_service_grpc_pb';
import {GetActiveContractsRequest} from "../model/GetActiveContractsRequest";
import {ClientReadableObjectStream} from "../call/ClientReadableObjectStream";
import {GetActiveContractsResponse} from "../model/GetActiveContractsResponse";
import {GetActiveContractsRequestValidation} from "../validation/GetActiveContractsRequestValidation";
import {isValid} from "../validation/Validation";
import {GetActiveContractsResponseCodec} from "../codec/GetActiveContractsResponseCodec";
import {GetActiveContractsRequestCodec} from "../codec/GetActiveContractsRequestCodec";
import {ValidationReporter} from "../reporting/ValidationReporter";

/**
 * Allows clients to initialize themselves according to a fairly recent state
 * of the ledger without reading through all transactions that were committed
 * since the ledger's creation.
 */
export class ActiveContractsClient {

    private readonly ledgerId: string;
    private readonly client: IActiveContractsServiceClient;
    private readonly reporter: ValidationReporter;

    constructor(ledgerId: string, client: IActiveContractsServiceClient, reporter: ValidationReporter) {
        this.ledgerId = ledgerId;
        this.client = client;
        this.reporter = reporter;
    }

    /**
     * Returns a stream of the latest snapshot of active contracts. Getting an
     * empty stream means that the active contracts set is empty and the client
     * should listen to transactions using LEDGER_BEGIN.
     *
     * Clients SHOULD NOT assume that the set of active contracts they receive
     * reflects the state at the ledger end.
     */
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