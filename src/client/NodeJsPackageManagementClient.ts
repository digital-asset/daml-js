// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {IPackageManagementServiceClient} from "../generated/com/daml/ledger/api/v1/admin/package_management_service_grpc_pb";
import {ListKnownPackagesRequest} from "../generated/com/daml/ledger/api/v1/admin/package_management_service_pb";
import {ListKnownPackageResponse} from "../model/ListKnownPackageResponse";
import {ListKnownPackageResponseCodec} from "../codec/ListKnownPackageResponseCodec";
import {UploadDarFileRequest} from "../model/UploadDarFileRequest";
import {UploadDarFileRequestCodec} from "../codec/UploadDarFileRequestCodec";
import {PackageManagementClient} from "./PackageManagementClient";
import {Callback, forward, promisify, forwardVoidResponse} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {ValidationReporter} from "../reporting/ValidationReporter";
import {UploadDarFileRequestValidation} from "../validation/UploadDarFileRequestValidation";
import {isValid} from "../validation/Validation";

export class NodeJsPackageManagementClient implements PackageManagementClient {
    
    private static listKnownPackageRequest = new ListKnownPackagesRequest();
    private readonly client: IPackageManagementServiceClient;
    private readonly reporter: ValidationReporter;

    constructor(client: IPackageManagementServiceClient, reporter: ValidationReporter) {
        this.client = client;
        this.reporter = reporter;
    }
    
    private listKnownPackagesCallback(callback: Callback<ListKnownPackageResponse>): ClientCancellableCall {
        return ClientCancellableCall.accept(this.client.listKnownPackages(NodeJsPackageManagementClient.listKnownPackageRequest, (error, response)=>{
            forward(callback, error, response, ListKnownPackageResponseCodec.deserialize);
        }))
    }

    private listKnownPackagesPromise: () => Promise<ListKnownPackageResponse> = promisify(this.listKnownPackagesCallback);
    listKnownPackages(): Promise<ListKnownPackageResponse>;    
    listKnownPackages(callback: Callback<ListKnownPackageResponse>): ClientCancellableCall;
    listKnownPackages(callback?: Callback<ListKnownPackageResponse>) {
        return callback ? this.listKnownPackagesCallback(callback) : this.listKnownPackagesPromise();
    }

    private uploadDarFileCallback(requestObj: UploadDarFileRequest, callback: Callback<void>) {
        const validation = UploadDarFileRequestValidation.validate(requestObj);
        if (isValid(validation)) {
            const request = UploadDarFileRequestCodec.serialize(requestObj);
            return ClientCancellableCall.accept(this.client.uploadDarFile(request, (error, _)=>{
                forwardVoidResponse(callback, error);
            }))
        }else {
            setImmediate(() => callback(new Error(this.reporter.render(validation))));
            return ClientCancellableCall.rejected;
        }
    }

    private uploadDarFilePromise: (requestObj: UploadDarFileRequest) => Promise<void> = promisify(this.uploadDarFileCallback);

    uploadDarFile(requestObj: UploadDarFileRequest): Promise<void>
    uploadDarFile(requestObj: UploadDarFileRequest, callback: Callback<void>): ClientCancellableCall
    uploadDarFile(requestObj: UploadDarFileRequest, callback?: Callback<void>): ClientCancellableCall | Promise<void> {
        return callback ? this.uploadDarFileCallback(requestObj, callback) : this.uploadDarFilePromise(requestObj);
    }
    
}