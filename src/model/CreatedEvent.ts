// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Identifier} from "./Identifier";
import {Record} from "./Record";
import {Value} from "./Value";

/**
 * Records that a contract has been created, and choices may now be exercised on it.
 *
 * Example:
 *
 * ```
 * {
 *     eventType: 'created',
 *     eventId: 'some-event-id',
 *     contractId: 'some-contract-id',
 *     templateId: {
 *         packageId: 'my-package-id',
 *         moduleName: 'SomeModule',
 *         entityName: 'SomeTemplate'
 *     },
 *     arguments: {
 *         fields: {
 *             someKey: { valueType: 'bool', bool: true }
 *         }
 *     },
 *     witnessParties: [ 'Alice', 'Bob' ],
 *     signatories: ['Alice'],
 *     observers: []
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see Identifier
 * @see Record
 */
export interface CreatedEvent {

    /**
     * A fixed type tag to identify this as a created event.
     */
    eventType: 'created'

    /**
     * The identifier for this particular event.
     */
    eventId: string

    /**
     * The identifier for the created contract.
     */
    contractId: string

    /**
     * The template of the created contract.
     */
    templateId: Identifier

    /**
     * The arguments that have been used to create the contract.
     */
    arguments: Record

    /**
     * The parties that are notified of this event. For created events,
     * these are the intersection of the stakeholders of the contract in
     * question and the parties specified in the @{link TransactionFilter}.
     * The stakeholders are the union of the signatories and the observers
     * of the contract.
     */
    witnessParties: string[]

    /**
     * The agreement text of the contract.
     *
     * @since Ledger API 0.12.18
     */
    agreementText?: string

    /**
     * The key of the contract created by this event.
     *
     * @since Ledger API 0.12.25
     */
    contractKey?: Value

    /**
     * The signatories of the contract created by this event.
     *
     * @since Ledger API 0.13.8
     */
    signatories: string[]

    /**
     * The observers of the contract created by this event.
     *
     * @since Ledger API 0.13.8
     */
    observers: string[]
}