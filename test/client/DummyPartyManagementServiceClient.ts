// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {CallOptions, ClientUnaryCall, Metadata, ServiceError} from '@grpc/grpc-js';
import {
    AllocatePartyRequest,
    AllocatePartyResponse,
    GetParticipantIdRequest,
    GetParticipantIdResponse, GetPartiesRequest, GetPartiesResponse,
    ListKnownPartiesRequest,
    ListKnownPartiesResponse,
    PartyDetails
} from "../../src/generated/com/daml/ledger/api/v1/admin/party_management_service_pb"
import {IPartyManagementServiceClient} from "../../src/generated/com/daml/ledger/api/v1/admin/party_management_service_grpc_pb"
import {DummyClientUnaryCall} from "../call/DummyClientUnaryCall";
import * as sinon from "sinon";

export class DummyPartyManagementServiceClient implements IPartyManagementServiceClient {

    private readonly latestRequestSpy: sinon.SinonSpy;
    private readonly getParticipantIdResponse: GetParticipantIdResponse;
    private readonly getPartiesResponse: GetPartiesResponse;
    private readonly listKnownPartiesResponse: ListKnownPartiesResponse;
    private readonly allocatePartyResponse: AllocatePartyResponse;

    constructor(latestRequestSpy: sinon.SinonSpy) {
        this.latestRequestSpy = latestRequestSpy;
        this.getParticipantIdResponse = new GetParticipantIdResponse();
        this.getPartiesResponse = new GetPartiesResponse();
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
            error: ServiceError | null,
            response: GetParticipantIdResponse
        ) => void
    ): ClientUnaryCall;

    getParticipantId(
        request: GetParticipantIdRequest,
        metadata: Metadata,
        callback: (
            error: ServiceError | null,
            response: GetParticipantIdResponse) => void
    ): ClientUnaryCall;

    getParticipantId(
        request: GetParticipantIdRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (
            error: ServiceError | null,
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
        cb(null, this.getParticipantIdResponse);
        return DummyClientUnaryCall.Instance;
    };

    getParties(
        request: GetPartiesRequest,
        callback: (
            error: ServiceError | null,
            response: GetPartiesResponse
        ) => void
    ): ClientUnaryCall;

    getParties(
        request: GetPartiesRequest,
        metadata: Metadata,
        callback: (
            error: ServiceError | null,
            response: GetPartiesResponse) => void
    ): ClientUnaryCall;

    getParties(
        request: GetPartiesRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (
            error: ServiceError | null,
            response: GetPartiesResponse) => void
    ): ClientUnaryCall;

    getParties(
        request: GetPartiesRequest,
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
        cb(null, this.getPartiesResponse);
        return DummyClientUnaryCall.Instance;
    };

    listKnownParties(
        request: ListKnownPartiesRequest,
        callback: (
            error: ServiceError | null,
            response: ListKnownPartiesResponse
        ) => void
    ): ClientUnaryCall;

    listKnownParties(
        request: ListKnownPartiesRequest,
        metadata: Metadata,
        callback: (
            error: ServiceError | null,
            response: ListKnownPartiesResponse) => void
    ): ClientUnaryCall;

    listKnownParties(
        request: ListKnownPartiesRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (
            error: ServiceError | null,
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
        callback: (error: ServiceError | null,
            response: AllocatePartyResponse
        ) => void
    ): ClientUnaryCall;

    allocateParty(
        request: AllocatePartyRequest,
        metadata: Metadata,
        callback: (
            error: ServiceError | null,
            response: AllocatePartyResponse) => void
    ): ClientUnaryCall;

    allocateParty(
        request: AllocatePartyRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (
            error: ServiceError | null,
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
