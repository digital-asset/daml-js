// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {PackageStatus} from "./PackageStatus";

/**
 * The status of the package.
 *
 * Example:
 *
 * ```
 * {
 *     status: PackageStatus.REGISTERED
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see PackageStatus
 */
export interface GetPackageStatusResponse {
    status: PackageStatus
}