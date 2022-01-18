// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Identifier} from "./Identifier";
import {Value} from "./Value";

/**
 * Exercise a choice on an existing contract.
 *
 * Example:
 *
 * ```
 * {
 *     commandType: 'exercise',
 *     templateId: {
 *         packageId: 'some-package-id',
 *         moduleName: 'SomeModule',
 *         entityName: 'SomeTemplate',
 *     },
 *     choice: 'Issue',
 *     contractId: 'some-contract-id',
 *     argument: {
 *         valueType: 'record',
 *         fields: {
 *             quantity: {
 *                 valueType: 'int64',
 *                 int64: '100'
 *             },
 *             price: {
 *                 valueType: 'decimal',
 *                 decimal: '42'
 *             }
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
export interface ExerciseCommand {

    /**
     * A fixed type tag that identifies this as an exercise command
     */
    commandType: 'exercise',

    /**
     * The template of contract the client wants to exercise.
     */
    templateId: Identifier

    /**
     * The name of the choice the client wants to exercise.
     */
    choice: string

    /**
     * The identifier of the contract the client wants to exercise upon.
     */
    contractId: string

    /**
     * The argument for this choice.
     */
    argument: Value
}