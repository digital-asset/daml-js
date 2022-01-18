// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Identifier} from './Identifier';
import {Record} from './Record';
import {Value} from "./Value";

/**
 * Create a contract and exercise a choice on it in the same transaction.
 *
 * Example:
 *
 * ```
 * {
 *     commandType: 'create',
 *     templateId: {
 *         packageId: 'some-package-id',
 *         moduleName: 'SomeModule',
 *         entityName: 'SomeTemplate'
 *     },
 *     createArguments: {
 *         fields: {
 *             owner: {
 *                 valueType: 'party',
 *                 party: 'Alice'
 *             }
 *         }
 *     },
 *     choice: 'Issue',
 *     choiceArgument: {
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
 * @see Record
 * @see Value
 */
export interface CreateAndExerciseCommand {

    /**
     * A fixed type tag that identifies this as a create-and-exercise command
     */
    commandType: 'createAndExercise',

    /**
     * The template of the contract the client wants to create
     */
    templateId: Identifier

    /**
     * The arguments required for creating a contract from this template.
     */
    createArguments: Record

    /**
     * The name of the choice the client wants to exercise.
     */
    choice: string

    /**
     * The argument for this choice.
     */
    choiceArgument: Value
}