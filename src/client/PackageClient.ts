// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Callback} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {ListPackagesResponse} from "../model/ListPackagesResponse";
import {GetPackageResponse} from "../model/GetPackageResponse";
import {GetPackageStatusResponse} from "../model/GetPackageStatusResponse";

/**
 * Allows clients to query the DAML LF packages that are supported by the
 * server.
 */
export interface PackageClient {

    /**
     * Returns the identifiers of all supported packages.
     */
    listPackages(): Promise<ListPackagesResponse>
    listPackages(callback: Callback<ListPackagesResponse>): ClientCancellableCall

    /**
     * Returns the contents of a single package, or a NOT_FOUND error if the
     * requested package is unknown.
     */
    getPackage(packageId: string): Promise<GetPackageResponse>
    getPackage(packageId: string, callback: Callback<GetPackageResponse>): ClientCancellableCall

    /**
     * Returns the status of a single package.
     */
    getPackageStatus(packageId: string): Promise<GetPackageStatusResponse>
    getPackageStatus(packageId: string, callback: Callback<GetPackageStatusResponse>): ClientCancellableCall

}
