// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Filters} from "./Filters";

/**
 * Keys of the map determine which parties' on-ledger transactions are being queried.
 * Values of the map determine which events are disclosed in the stream per party.
 * At the minimum, a party needs to set an empty Filters message to receive any events.
 *
 * Example:
 *
 * ```
 * {
 *     filtersByParty: {
 *         Alice: {
 *             inclusive: {
 *                 templateIds: [
 *                     {
 *                         packageId: 'some-package-id',
 *                         moduleName: 'SomeModule',
 *                         entityName: 'SomeTemplate'
 *                     }
 *                 ]
 *             }
 *         }
 *     }
 * }
 * ```
 *
 * @see Filters
 * @see InclusiveFilters
 * @see Identifier
 */
export interface TransactionFilter {
    filtersByParty: Record<string, Filters>
}