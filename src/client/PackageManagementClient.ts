// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Callback} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {ListKnownPackageResponse} from "../model/ListKnownPackageResponse";
import {UploadDarFileRequest} from "../model/UploadDarFileRequest";

/**
 * Methods to inspect package and to upload DAR files
 */
export interface PackageManagementClient {

    /**
     * List information about packages uploaded to participants.
     */
    listKnownPackages(): Promise<ListKnownPackageResponse>
    listKnownPackages(callback: Callback<ListKnownPackageResponse>): ClientCancellableCall
    
    /**
     * 
     * Method to upload dar file.
     * 
     * @param requestObj encapsulate dar file stream.
     */
    uploadDarFile(requestObj:UploadDarFileRequest): Promise<void>
    uploadDarFile(requestObj:UploadDarFileRequest, callback: Callback<void>): ClientCancellableCall
}
