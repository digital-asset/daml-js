// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Identifier} from "./Identifier";
import {Value} from "./Value";

/**
 * Contains nested values.
 *
 * ```
 * {
 *     fields: {
 *         aFlag: {
 *             valueType: 'bool',
 *             bool: true
 *         },
 *         aString: {
 *             valueType: 'text',
 *             text: 'a string'
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
export interface Record {

    /**
     * Omitted from the transaction stream when verbose streaming is not enabled.
     *
     * Optional when submitting commands.
     */
    recordId?: Identifier

    /**
     * The nested values of the record.
     */
    fields: { [k: string]: Value }

}