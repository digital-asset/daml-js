// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Identifier} from './Identifier';

/**
 * Records that a contract has been archived, and choices may no longer be exercised on it.
 *
 * Example:
 *
 * ```
 * {
 *     eventType: 'archived',
 *     contractId: 'my-contract-id',
 *     eventId: 'my-event-id',
 *     templateId: {
 *         packageId: 'my-package-id',
 *         moduleName: 'SomeModule',
 *         entityName: 'SomeTemplate'
 *     },
 *     witnessParties: [ 'Alice', 'Bob' ]
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see Identifier
 */
export interface ArchivedEvent {

    /**
     * A fixed type tag to identify this as an archived event.
     */
    eventType: 'archived'

    /**
     * The identifier of the archived contract.
     */
    contractId: string

    /**
     * The identifier of this particular event.
     */
    eventId: string

    /**
     * The template of the archived contract.
     */
    templateId: Identifier

    /**
     * The parties that are notified of this event. For archived events,
     * these are the intersection of the stakeholders of the contract in
     * question and the parties specified in the {@link TransactionFilter}.
     * The stakeholders are the union of the signatories and the observers
     * of the contract.
     */
    witnessParties: string[]
}