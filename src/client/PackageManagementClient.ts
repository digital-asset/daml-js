// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Callback} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {ListKnownPackageResponse} from "../model/ListKnownPackageResponse";
import {UploadDarFileRequest} from "../model/UploadDarFileRequest";

export interface PackageManagementClient {
    listKnownPackages(): Promise<ListKnownPackageResponse>
    listKnownPackages(callback: Callback<ListKnownPackageResponse>): ClientCancellableCall
    
    uploadDarFile(requestObj:UploadDarFileRequest): Promise<void>
    uploadDarFile(requestObj:UploadDarFileRequest, callback: Callback<void>): ClientCancellableCall
}
