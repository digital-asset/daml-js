// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {InclusiveFilters} from "./InclusiveFilters";

/**
 * Example:
 *
 * ```
 * {
 *     inclusive: {
 *         templateIds: [
 *             {
 *                 packageId: 'some-package-id',
 *                 moduleName: 'SomeModule',
 *                 entityName: 'SomeTemplate'
 *             }
 *         ]
 *     }
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see InclusiveFilters
 * @see Identifier
 */
export interface Filters {

    /**
     * If not set, no filters will be applied.
     */
    inclusive?: InclusiveFilters
}