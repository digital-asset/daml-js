// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Identifier} from "./Identifier";

/**
 * If no internal fields are set, no data will be returned.
 *
 * Example:
 *
 * ```
 * {
 *     templateIds: [
 *         {
 *             packageId: 'some-package-id',
 *             moduleName: 'SomeModule',
 *             entityName: 'SomeTemplate'
 *         }
 *     ]
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see Identifier
 */
export interface InclusiveFilters {

    /**
     * A collection of templates.
     * SHOULD NOT contain duplicates.
     */
    templateIds: Identifier[]
}