// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Value} from "./Value";
import {Identifier} from "./Identifier";

/**
 * Records that a choice has been exercised on a target contract
 *
 * Example:
 *
 * ```
 * {
 *     eventType: 'exercised',
 *     actingParties: [ 'Alice', 'Bob' ],
 *     childEventIds: [ 'child-01', 'child-02' ],
 *     choice: 'Accept',
 *     argument: {
 *         valueType: 'record',
 *         fields: {
 *             amount: {
 *                 valueType: 'int64',
 *                 int64: '42'
 *             },
 *             expiry: {
 *                 valueType: 'timestamp',
 *                 timestamp: '1554382900000000'
 *             }
 *         }
 *     },
 *     consuming: true,
 *     contractId: 'some-contract-id',
 *     eventId: 'some-event-id',
 *     templateId: {
 *         packageId: 'some-package-id',
 *         moduleName: 'SomeModule',
 *         entityName: 'SomeTemplate'
 *     },
 *     witnessParties: [ 'Charlie', 'Diane' ],
 *     exerciseResult: {
 *         valueType: 'text',
 *         text: 'fa7c46eb-bbf9-4eb9-9302-1123b42ce244'
 *     }
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 */
export interface ExercisedEvent {

    /**
     * A fixed type tag to identify this as an exercised event.
     */
    eventType: 'exercised'

    /**
     * The parties that made the choice.
     */
    actingParties: string[]

    /**
     * References to further events in the same transaction that appeared as a result of this exercised event.
     *
     * It contains only the immediate children of this event, not all members of the subtree rooted at this node.
     */
    childEventIds?: string[]

    /**
     * The choice that's been exercised on the target contract.
     */
    choice: string

    /**
     * The argument the choice was made with.
     */
    argument: Value

    /**
     * If true, the target contract may no longer be exercised.
     */
    consuming: boolean

    /**
     * The identifier of the target contract.
     */
    contractId: string

    /**
     * The identifier of this particular event.
     */
    eventId: string

    /**
     * The template of the target contract.
     */
    templateId: Identifier

    /**
     * The parties that are notified of this event. The witnesses of an exercise
     * node will depend on whether the exercise was consuming or not.
     *
     * If consuming, the witnesses are the union of the stakeholders and
     * the actors.
     *
     * If not consuming, the witnesses are the union of the signatories and
     * the actors. Note that the actors might not necessarily be observers
     * and thus signatories. This is the case when the controllers of a
     * choice are specified using "flexible controllers", using the
     * `choice ... controller` syntax, and said controllers are not
     * explicitly marked as observers.
     */
    witnessParties: string[]

    /**
     * The result of exercising the choice.
     *
     * @since Ledger API 0.12.16
     */
    exerciseResult?: Value
}