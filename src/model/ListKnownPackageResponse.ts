// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { PackageDetails } from "./PackageDetails";

/**
 * Examples:
 * 
 * ```
 * {
 *  packageDetailsList: [{
 *      packageId: <string value>
 *      packageSize: <numeric value>
 *      knownSince: optional<timestamp>
 *      sourceDescription: <string value>
 *  }]
 * }
 * ```
 */
export interface ListKnownPackageResponse {

    /**
     * Array of package details
     */
    packageDetailsList: Array<PackageDetails>
}