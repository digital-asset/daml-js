// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {CallOptions, ClientUnaryCall, Metadata, ServiceError} from '@grpc/grpc-js';

import * as sinon from 'sinon';
import {IPackageServiceClient} from "../../src/generated/com/daml/ledger/api/v1/package_service_grpc_pb";
import {
    GetPackageRequest, GetPackageResponse, GetPackageStatusRequest, GetPackageStatusResponse,
    ListPackagesRequest,
    ListPackagesResponse
} from "../../src/generated/com/daml/ledger/api/v1/package_service_pb";
import {DummyClientUnaryCall} from "../call/DummyClientUnaryCall";

export class DummyPackageServiceClient implements IPackageServiceClient {

    private readonly latestRequestSpy: sinon.SinonSpy;
    private readonly listPackagesResponse: ListPackagesResponse;
    private readonly getPackageResponse: GetPackageResponse;
    private readonly getPackageStatusResponse: GetPackageStatusResponse;

    constructor(
        latestRequestSpy: sinon.SinonSpy
    ) {
        this.latestRequestSpy = latestRequestSpy;
        this.listPackagesResponse = new ListPackagesResponse();
        this.getPackageResponse = new GetPackageResponse();
        this.getPackageStatusResponse = new GetPackageStatusResponse();
    }

    listPackages(
        request: ListPackagesRequest,
        callback: (error: ServiceError | null, response: ListPackagesResponse) => void
    ): ClientUnaryCall;
    listPackages(
        request: ListPackagesRequest,
        metadata: Metadata,
        callback: (error: ServiceError | null, response: ListPackagesResponse) => void
    ): ClientUnaryCall;
    listPackages(
        request: ListPackagesRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (error: ServiceError | null, response: ListPackagesResponse) => void
    ): ClientUnaryCall;
    listPackages(
        request: ListPackagesRequest,
        metadata: any,
        options?: any,
        callback?: any
    ) {
        this.latestRequestSpy(request);
        const cb =
            callback === undefined
                ? options === undefined
                ? metadata
                : options
                : callback;
        cb(null, this.listPackagesResponse);
        return DummyClientUnaryCall.Instance;
    }

    getPackage(
        request: GetPackageRequest,
        callback: (error: ServiceError | null, response: GetPackageResponse) => void
    ): ClientUnaryCall;
    getPackage(
        request: GetPackageRequest,
        metadata: Metadata,
        callback: (error: ServiceError | null, response: GetPackageResponse) => void
    ): ClientUnaryCall;
    getPackage(
        request: GetPackageRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (error: ServiceError | null, response: GetPackageResponse) => void
    ): ClientUnaryCall;
    getPackage(
        request: GetPackageRequest,
        metadata: any,
        options?: any,
        callback?: any
    ) {
        this.latestRequestSpy(request);
        const cb =
            callback === undefined
                ? options === undefined
                ? metadata
                : options
                : callback;
        setImmediate(() => cb(null, this.getPackageResponse));
        return DummyClientUnaryCall.Instance;
    }

    getPackageStatus(
        request: GetPackageStatusRequest,
        callback: (
            error: ServiceError | null,
            response: GetPackageStatusResponse
        ) => void
    ): ClientUnaryCall;
    getPackageStatus(
        request: GetPackageStatusRequest,
        metadata: Metadata,
        callback: (
            error: ServiceError | null,
            response: GetPackageStatusResponse
        ) => void
    ): ClientUnaryCall;
    getPackageStatus(
        request: GetPackageStatusRequest,
        metadata: Metadata,
        options: Partial<CallOptions>,
        callback: (
            error: ServiceError | null,
            response: GetPackageStatusResponse
        ) => void
    ): ClientUnaryCall;
    getPackageStatus(
        request: GetPackageStatusRequest,
        metadata: any,
        options?: any,
        callback?: any
    ) {
        this.latestRequestSpy(request);
        const cb =
            callback === undefined
                ? options === undefined
                ? metadata
                : options
                : callback;
        setImmediate(() => cb(null, this.getPackageStatusResponse));
        return DummyClientUnaryCall.Instance;
    }
}
