// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {TransactionFilter} from "./TransactionFilter";
import {LedgerOffset} from "./LedgerOffset";

/**
 * Example:
 *
 * ```
 * {
 *     begin: { offsetType: 'boundary', boundary: LedgerOffsetBoundaryValue.END }
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
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see LedgerOffset
 * @see TransactionFilter
 * @see Filters
 * @see InclusiveFilters
 * @see Identifier
 *
 */
export interface GetTransactionsRequest {

    /**
     * Beginning of the requested ledger section.
     */
    begin: LedgerOffset

    /**
     * End of the requested ledger section.
     *
     * Optional, if not set, the stream will not terminate.
     */
    end?: LedgerOffset

    /**
     * Requesting parties with template filters.
     */
    filter: TransactionFilter

    /**
     * If enabled, values served over the API will contain more information than strictly necessary to interpret the data.
     *
     * In particular, setting the verbose flag to true triggers the ledger to include labels for record fields.
     *
     * Defaults to `true` if not explicitly set.
     */
    verbose?: boolean
}