// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Callback} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {ListKnownPackageResponse} from "../model/ListKnownPackageResponse";
import {UploadDarFileRequest} from "../model/UploadDarFileRequest";
import {UploadDarFileResponse} from "../model/UploadDarFileResponse";

export interface PackagementClient {
    listKnownPackages(): Promise<ListKnownPackageResponse>
    listKnownPackages(callback: Callback<ListKnownPackageResponse>): ClientCancellableCall
    
    uploadDarFile(requestObj:UploadDarFileRequest): Promise<UploadDarFileResponse>
    uploadDarFile(requestObj:UploadDarFileRequest, callback: Callback<UploadDarFileResponse>): ClientCancellableCall
}