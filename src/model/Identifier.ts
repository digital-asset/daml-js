// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Unique identifier of an entity.
 *
 * Example:
 *
 * ```
 * {
 *     packageId: 'some-package-id',
 *     moduleName: 'SomeModule',
 *     entityName: 'SomeTemplate'
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 */
export interface Identifier {

    /**
     * The identifier of the DAML package that contains the entity.
     */
    packageId: string

    /**
     * The dot-separated module name of the identifier.
     */
    moduleName: string

    /**
     * The dot-separated name of the entity (e.g. record, template, ...) within the module.
     */
    entityName: string
}