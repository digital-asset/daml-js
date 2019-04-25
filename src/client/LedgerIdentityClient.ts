// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {ILedgerIdentityServiceClient} from "../generated/com/digitalasset/ledger/api/v1/ledger_identity_service_grpc_pb";
import {Callback, forward} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {GetLedgerIdentityResponse} from "../model/GetLedgerIdentityResponse";
import {GetLedgerIdentityResponseCodec} from "../codec/GetLedgerIdentityResponseCodec";
import {GetLedgerIdentityRequest} from "../generated/com/digitalasset/ledger/api/v1/ledger_identity_service_pb";

/**
 * Allows clients to verify that the server they are communicating with
 * exposes the ledger they wish to operate on.
 *
 * Note that every ledger has a unique id.
 */
export class LedgerIdentityClient {

    private static request = new GetLedgerIdentityRequest();

    private readonly client: ILedgerIdentityServiceClient;

    constructor(client: ILedgerIdentityServiceClient) {
        this.client = client;
    }

    /**
     * Clients may call this RPC to return the identifier of the ledger they
     * are connected to.
     */
    getLedgerIdentity(callback: Callback<GetLedgerIdentityResponse>): ClientCancellableCall {
        return ClientCancellableCall.accept(this.client.getLedgerIdentity(LedgerIdentityClient.request, (error, response) => {
            forward(callback, error, response, GetLedgerIdentityResponseCodec.deserialize);
        }));
    }

}
