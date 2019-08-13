// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Identifier} from './Identifier';
import {Value} from "./Value";

/**
 * A value with alternative representations.
 *
 * Example:
 *
 * ```
 * {
 *     constructor: 'SomeVariant',
 *     value: {
 *         valueType: 'record',
 *         fields: {
 *             a: { valueType: 'bool', bool: true },
 *             b: { valueType: 'int64', int64: '42' }
 *         }
 *     }
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see Identifier
 * @see Value
 */
export interface Variant {

    /**
     * Omitted from the transaction stream when verbose streaming is not enabled.
     *
     * Optional when submitting commands.
     */
    variantId?: Identifier

    /**
     * Determines which of the variant's alternatives is encoded in this message.
     */
    constructor: string

    /**
     * The value encoded within the Variant.
     */
    value: Value

}