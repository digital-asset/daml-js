// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {IPartyManagementServiceClient} from "../generated/com/digitalasset/ledger/api/v1/admin/party_management_service_grpc_pb"
import {Callback, forward, promisify} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {PartyManagementClient} from "./PartyManagementClient";
import {ListKnownPartiesResponse} from "../model/ListKnownPartiesResponse";
import {ListKnownPartiesRequest} from "../generated/com/digitalasset/ledger/api/v1/admin/party_management_service_pb";
import {ListKnownPartiesResponseCodec} from "../codec/ListKnownPartiesResponseCodec";

export class NodeJsPartyManagementClient implements PartyManagementClient{

    private static request = new ListKnownPartiesRequest();
    private readonly client: IPartyManagementServiceClient;

    constructor(client: IPartyManagementServiceClient){
        this.client = client;
    }

    private listKnownPartiesCallback(callback: Callback<ListKnownPartiesResponse>): ClientCancellableCall{
        return ClientCancellableCall.accept(this.client.listKnownParties(NodeJsPartyManagementClient.request, (error, response) =>{
            forward(callback, error, response, ListKnownPartiesResponseCodec.deserialize);
        }));
    }

    private listKnownPartiesPromise: () => Promise<ListKnownPartiesResponse> = promisify(this.listKnownPartiesCallback);

    listKnownParties(): Promise<ListKnownPartiesResponse>
    listKnownParties(callback: Callback<ListKnownPartiesResponse>): ClientCancellableCall
    listKnownParties(callback?: Callback<ListKnownPartiesResponse>): ClientCancellableCall | Promise<ListKnownPartiesResponse>{
        return callback ? this.listKnownPartiesCallback(callback) : this.listKnownPartiesPromise();
    }

}