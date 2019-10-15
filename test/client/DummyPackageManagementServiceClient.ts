// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ClientUnaryCall, Metadata, ServiceError, CallOptions} from 'grpc';
import {
    ListKnownPackagesRequest,
    ListKnownPackagesResponse,
    UploadDarFileRequest,
    UploadDarFileResponse,
    PackageDetails,
} from "../../src/generated/com/digitalasset/ledger/api/v1/admin/package_management_service_pb";
import {IPackageManagementServiceClient} from "../../src/generated/com/digitalasset/ledger/api/v1/admin/package_management_service_grpc_pb";
import {DummyClientUnaryCall} from "../call/DummyClientUnaryCall";
import * as sinon from "sinon";

export class DummyPackageManagementServiceClient implements IPackageManagementServiceClient {
  
    private readonly latestRequestSpy: sinon.SinonSpy;
    private readonly listKnownPackagesResponse: ListKnownPackagesResponse;
    private readonly uploadDarFileResponse: UploadDarFileResponse;

    constructor(latestRequestSpy: sinon.SinonSpy) {
        this.latestRequestSpy = latestRequestSpy;
        this.listKnownPackagesResponse = new ListKnownPackagesResponse();
        const packageDetails = new PackageDetails();
        packageDetails.setPackageId("123456");
        packageDetails.setPackageSize(4);
        packageDetails.setKnownSince(undefined);
        packageDetails.setSourceDescription('source description');
        const packageDetailsList: PackageDetails[] = [packageDetails];
        this.listKnownPackagesResponse.setPackageDetailsList(packageDetailsList);

        this.uploadDarFileResponse = new UploadDarFileResponse();
    }

    listKnownPackages(
        request: ListKnownPackagesRequest, 
        callback: (error: ServiceError, 
                   response: ListKnownPackagesResponse) => void
    ): ClientUnaryCall;

    listKnownPackages(
        request: ListKnownPackagesRequest, 
        metadata: Metadata, 
        callback: (
            error: ServiceError, 
            response: ListKnownPackagesResponse) => void
    ): ClientUnaryCall;

    listKnownPackages(
        request: ListKnownPackagesRequest, 
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
        setImmediate(() => cb(null, this.listKnownPackagesResponse));
        return DummyClientUnaryCall.Instance;
    }

    uploadDarFile(
        request: UploadDarFileRequest, 
        callback: (error: ServiceError, 
                   response: UploadDarFileResponse) => void
    ): ClientUnaryCall;

    uploadDarFile(
        request: UploadDarFileRequest, 
        metadata: Metadata, 
        callback: (error: ServiceError, 
                   response: UploadDarFileResponse) => void
    ): ClientUnaryCall;

    uploadDarFile(
        request: UploadDarFileRequest, 
        metadata: Metadata, 
        options: Partial<CallOptions>, 
        callback: (error: ServiceError, 
                   response: UploadDarFileResponse) => void
    ): ClientUnaryCall;

    uploadDarFile(
        request: any, 
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
        this.latestRequestSpy(request)
        setImmediate(() => cb(null, this.uploadDarFileResponse));
        return DummyClientUnaryCall.Instance;
    }

}