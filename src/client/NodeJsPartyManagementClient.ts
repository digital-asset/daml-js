// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {IPartyManagementServiceClient} from "../generated/com/digitalasset/ledger/api/v1/admin/party_management_service_grpc_pb"
import {Callback, forward, promisify} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {PartyManagementClient} from "./PartyManagementClient";
import {GetParticipantIdResponse} from "../model/GetParticipantIdResponse";
import {GetParticipantIdResponseCodec} from "../codec/GetParticipantIdResponseCodec";
import {ListKnownPartiesResponse} from "../model/ListKnownPartiesResponse";
import {ListKnownPartiesRequest, GetParticipantIdRequest} from "../generated/com/digitalasset/ledger/api/v1/admin/party_management_service_pb";
import {ListKnownPartiesResponseCodec} from "../codec/ListKnownPartiesResponseCodec";
import {isValid} from "../validation/Validation";
import {AllocatePartyRequest} from "../model/AllocatePartyRequest";
import {AllocatePartyResponse} from "../model/AllocatePartyResponse";
import {ValidationReporter} from "../reporting/ValidationReporter";
import {AllocatePartyRequestValidation} from "../validation/AllocatePartyRequestValidation";
import {AllocatePartyRequestCodec} from "../codec/AllocatePartyRequestCodec";
import {AllocatePartyResponseCodec} from "../codec/AllocatePartyResponseCodec";

export class NodeJsPartyManagementClient implements PartyManagementClient {

    private static getParticipantIdRequest = new GetParticipantIdRequest();
    private static listKnownPartiesRequest = new ListKnownPartiesRequest();
    private readonly client: IPartyManagementServiceClient;
    private readonly reporter: ValidationReporter;

    constructor(client: IPartyManagementServiceClient, reporter: ValidationReporter) {
        this.client = client;
        this.reporter = reporter;
    }

    private getParticipantIdCallback(callback: Callback<GetParticipantIdResponse> ): ClientCancellableCall{
        return ClientCancellableCall.accept(this.client.getParticipantId(NodeJsPartyManagementClient.getParticipantIdRequest, (error, response)=>{
            forward(callback, error, response, GetParticipantIdResponseCodec.deserialize);
        }));
    } 

    private getParticipantIdPromise: () => Promise<GetParticipantIdResponse> = promisify(this.getParticipantIdCallback);
    getParticipantId() : Promise<GetParticipantIdResponse>
    getParticipantId(callback: Callback<GetParticipantIdResponse>): ClientCancellableCall
    getParticipantId(callback?: Callback<GetParticipantIdResponse>): ClientCancellableCall | Promise<GetParticipantIdResponse>{
        return callback ? this.getParticipantIdCallback(callback) : this.getParticipantIdPromise();
    }

    private allocatePartyCallback(requestObject: AllocatePartyRequest, callback: Callback<AllocatePartyResponse>) {
        const tree = AllocatePartyRequestValidation.validate(requestObject);
        if (isValid(tree)) {
            const request = AllocatePartyRequestCodec.serialize(requestObject);
            return ClientCancellableCall.accept(this.client.allocateParty(request, (error, response) => {
                forward(callback, error, response, AllocatePartyResponseCodec.deserialize);
            }));
        } else {
            setImmediate(() => callback(new Error(this.reporter.render(tree))));
            return ClientCancellableCall.rejected;
        }
    };

    private allocatePartyPromise: (requestObject: AllocatePartyRequest) => Promise<AllocatePartyResponse> = promisify(this.allocatePartyCallback);

    allocateParty(requestObject: AllocatePartyRequest): Promise<AllocatePartyResponse>
    allocateParty(requestObject: AllocatePartyRequest, callback: Callback<AllocatePartyResponse>): ClientCancellableCall
    allocateParty(requestObject: AllocatePartyRequest, callback?: Callback<AllocatePartyResponse>): ClientCancellableCall | Promise<AllocatePartyResponse> {
        return callback ? this.allocatePartyCallback(requestObject, callback) : this.allocatePartyPromise(requestObject);
    }

    private listKnownPartiesCallback(callback: Callback<ListKnownPartiesResponse>): ClientCancellableCall{
        return ClientCancellableCall.accept(this.client.listKnownParties(NodeJsPartyManagementClient.listKnownPartiesRequest, (error, response) =>{
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