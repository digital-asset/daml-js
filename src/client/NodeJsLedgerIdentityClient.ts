// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ILedgerIdentityServiceClient} from "../generated/com/digitalasset/ledger/api/v1/ledger_identity_service_grpc_pb";
import {Callback, forward, promisify} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {GetLedgerIdentityResponse} from "../model/GetLedgerIdentityResponse";
import {GetLedgerIdentityResponseCodec} from "../codec/GetLedgerIdentityResponseCodec";
import {GetLedgerIdentityRequest} from "../generated/com/digitalasset/ledger/api/v1/ledger_identity_service_pb";

export class NodeJsLedgerIdentityClient {

    private static request = new GetLedgerIdentityRequest();

    private readonly client: ILedgerIdentityServiceClient;

    constructor(client: ILedgerIdentityServiceClient) {
        this.client = client;
    }

    private getLedgerIdentityCallback(callback: Callback<GetLedgerIdentityResponse>): ClientCancellableCall {
        return ClientCancellableCall.accept(this.client.getLedgerIdentity(NodeJsLedgerIdentityClient.request, (error, response) => {
            forward(callback, error, response, GetLedgerIdentityResponseCodec.deserialize);
        }));
    }

    private getLedgerIdentityPromise: () => Promise<GetLedgerIdentityResponse> = promisify(this.getLedgerIdentityCallback);

    getLedgerIdentity(): Promise<GetLedgerIdentityResponse>
    getLedgerIdentity(callback: Callback<GetLedgerIdentityResponse>): ClientCancellableCall
    getLedgerIdentity(callback?: Callback<GetLedgerIdentityResponse>): ClientCancellableCall | Promise<GetLedgerIdentityResponse> {
        return callback ? this.getLedgerIdentityCallback(callback) : this.getLedgerIdentityPromise();
    }

}
