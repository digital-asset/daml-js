// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {TransactionFilter} from "./TransactionFilter";

/**
 * Example:
 *
 * ```
 * {
 *     filter: {
 *         filtersByParty: {
 *             Alice: {
 *                 inclusive: {
 *                     templateIds: [
 *                         {
 *                             packageId: 'some-package-id',
 *                             moduleName: 'SomeModule',
 *                             entityName: 'SomeTemplate'
 *                         }
 *                     ]
 *                 }
 *             }
 *         }
 *     }
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see TransactionFilter
 * @see Filters
 * @see InclusiveFilters
 * @see Identifier
 */
export interface GetActiveContractsRequest {

    /**
     * Templates to include in the served snapshot, per party.
     */
    filter: TransactionFilter

    /**
     * If enabled, values served over the API will contain more information than strictly necessary to interpret the data.
     * In particular, setting the verbose flag to true triggers the ledger to include labels for record fields.
     *
     * These bindings (and not the server) set this flag to true by default, unless otherwise specified.
     */
    verbose?: boolean
}