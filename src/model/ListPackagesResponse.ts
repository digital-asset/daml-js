// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Example:
 *
 * ```
 * {
 *     packageIds: [
 *         '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
 *         '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
 *         'b9c950640e1b3740e98acb93e669c65766f6670dd1609ba91ff41052ba48c6f3',
 *     ]
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 */
export interface ListPackagesResponse {

    /**
     * The identifier of all packages supported by the server.
     */
    packageIds: string[]

}