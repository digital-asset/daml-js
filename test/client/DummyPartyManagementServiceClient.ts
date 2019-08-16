// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ClientUnaryCall, Metadata} from 'grpc';
import {
    AllocatePartyRequest,
    AllocatePartyResponse,
    GetParticipantIdRequest,
    GetParticipantIdResponse,
    ListKnownPartiesRequest,
    ListKnownPartiesResponse,
    PartyDetails
} from "../../src/generated/com/digitalasset/ledger/api/v1/admin/party_management_service_pb"
import {IPartyManagementServiceClient} from "../../src/generated/com/digitalasset/ledger/api/v1/admin/party_management_service_grpc_pb"
import {DummyClientUnaryCall} from "../call/DummyClientUnaryCall";
import * as sinon from "sinon";

export class DummyPartyManagementServiceClient implements IPartyManagementServiceClient {

    private readonly latestRequestSpy: sinon.SinonSpy;
    private readonly listKnownPartiesResponse: ListKnownPartiesResponse;
    private readonly allocatePartyResponse: AllocatePartyResponse;

    constructor(latestRequestSpy: sinon.SinonSpy) {
        this.latestRequestSpy = latestRequestSpy;
        this.listKnownPartiesResponse = new ListKnownPartiesResponse();
        this.listKnownPartiesResponse.setPartyDetailsList([]);
        this.allocatePartyResponse = new AllocatePartyResponse();
        const dummyPartyDetails = new PartyDetails();
        dummyPartyDetails.setParty("party");
        dummyPartyDetails.setIsLocal(true);
        this.allocatePartyResponse.setPartyDetails(dummyPartyDetails);
    }

    getParticipantId(
        request: GetParticipantIdRequest, 
        callback: (
            error: Error | null, 
            response: GetParticipantIdResponse
        ) => void
    ): ClientUnaryCall;
    
    getParticipantId(
        request: GetParticipantIdRequest, 
        metadata: Metadata, 
        callback: (
            error: Error | null, 
            response: GetParticipantIdResponse) => void
    ): ClientUnaryCall;
    
    getParticipantId(
        request: GetParticipantIdRequest, 
        metadata: any, 
        options?: any, 
        callback?: any
    ){
        const cb = 
            callback === undefined
               ? options === undefined
               ? metadata
               : options
               : callback;
        this.latestRequestSpy(request)
        cb(null);
        return DummyClientUnaryCall.Instance;
    };
    
    listKnownParties(
        request: ListKnownPartiesRequest, 
        callback: (
            error: Error | null, 
            response: ListKnownPartiesResponse
        ) => void
    ): ClientUnaryCall;

    listKnownParties(
        request: ListKnownPartiesRequest, 
        metadata: Metadata, 
        callback: (
            error: Error | null, 
            response: ListKnownPartiesResponse) => void
    ): ClientUnaryCall;

    listKnownParties(
        request: ListKnownPartiesRequest, 
        metadata: any, 
        options?: any, 
        callback?: any
    ) {
        const cb =
            callback === undefined
                ? options === undefined
                ? metadata
                : options
                : callback;
        this.latestRequestSpy(request);
        cb(null, this.listKnownPartiesResponse);
        return DummyClientUnaryCall.Instance;
    };

    allocateParty(
        request: AllocatePartyRequest, 
        callback: (error: Error | null, 
            response: AllocatePartyResponse
        ) => void
    ): ClientUnaryCall;
    
    allocateParty(
        request: AllocatePartyRequest, 
        metadata: Metadata, 
        callback: (
            error: Error | null, 
            response: AllocatePartyResponse) => void
    ): ClientUnaryCall;

    allocateParty(
        request: AllocatePartyRequest, 
        metadata: any, 
        options?: any, 
        callback?: any
    ){
        const cb =
            callback === undefined
                ? options === undefined
                ? metadata
                : options
                : callback;
        this.latestRequestSpy(request);
        cb(null, this.allocatePartyResponse);
        return DummyClientUnaryCall.Instance;
    }
}