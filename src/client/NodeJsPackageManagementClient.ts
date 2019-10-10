// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {IPackageManagementServiceClient} from "../generated/com/digitalasset/ledger/api/v1/admin/package_management_service_grpc_pb";
import {ListKnownPackagesRequest} from "../generated/com/digitalasset/ledger/api/v1/admin/package_management_service_pb";
import {ListKnownPackageResponse} from "../model/ListKnownPackageResponse";
import {ListKnownPackageResponseCodec} from "../codec/ListKnownPackageResponseCodec";
import {UploadDarFileRequest} from "../model/UploadDarFileRequest";
import {UploadDarFileResponse} from "../model/UploadDarFileResponse";
import {UploadDarFileRequestCodec} from "../codec/UploadDarFileRequestCodec";
import {UploadDarFileResponseCodec} from "../codec/UploadDarFileResponseCodec";
import {PackagementClient} from "./PackageManagementClient";
import {Callback, forward, promisify} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {ValidationReporter} from "../reporting/ValidationReporter";
import {UploadDarFileRequestValidation} from "../validation/UploadDarFileRequestValidation";
import {isValid} from "../validation/Validation";

export class NodeJsPackageManagementClient implements PackagementClient {
    
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

    private uploadDarFileCallback(requestObj: UploadDarFileRequest, callback: Callback<UploadDarFileResponse>) {
        const validation = UploadDarFileRequestValidation.validate(requestObj);
        if (isValid(validation)) {
            const request = UploadDarFileRequestCodec.serialize(requestObj);
            return ClientCancellableCall.accept(this.client.uploadDarFile(request, (error, response)=>{
                forward(callback, error, response, UploadDarFileResponseCodec.deserialize);
            }))
        }else {
            setImmediate(() => callback(new Error(this.reporter.render(validation))));
            return ClientCancellableCall.rejected;
        }
    }

    private uploadDarFilePromise: (requestObj: UploadDarFileRequest) => Promise<UploadDarFileResponse> = promisify(this.uploadDarFileCallback);

    uploadDarFile(requestObj: UploadDarFileRequest): Promise<UploadDarFileResponse>
    uploadDarFile(requestObj: UploadDarFileRequest, callback: Callback<UploadDarFileResponse>): ClientCancellableCall
    uploadDarFile(requestObj: UploadDarFileRequest, callback?: Callback<UploadDarFileResponse>): ClientCancellableCall | Promise<UploadDarFileResponse> {
        return callback ? this.uploadDarFileCallback(requestObj, callback) : this.uploadDarFilePromise(requestObj);
    }
    
}