// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Timestamp} from "./Timestamp";
import {Event} from "./Event";

/**
 * Filtered view of an on-ledger transaction.
 *
 * Example:
 *
 * ```
 * {
 *     commandId: 'some-command-id',
 *     effectiveAt: {
 *         seconds: 1554382900
 *         nanoseconds: 0
 *     },
 *     events: [
 *         {
 *             eventType: 'created',
 *             eventId: 'some-event-id',
 *             contractId: 'some-contract-id',
 *             templateId: {
 *                 packageId: 'my-package-id',
 *                 moduleName: 'SomeModule',
 *                 entityName: 'SomeTemplate'
 *             },
 *             arguments: {
 *                 fields: {
 *                     someKey: { valueType: 'bool', bool: true }
 *                 }
 *             },
 *             witnessParties: [ 'Alice', 'Bob' ]
 *         }
 *     ],
 *     offset: '42',
 *     transactionId: 'some-tx-id',
 *     workflowId: 'some-workflow-id'
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see Timestamp
 * @see Event
 * @see Identifier
 * @see Record
 */
export interface Transaction {

    /**
     * The identifier of the command which resulted in this transaction.
     *
     * Missing for everyone except the submitting party.
     */
    commandId?: string

    /**
     * Ledger effective time.
     */
    effectiveAt: Timestamp

    /**
     * The collection of events.
     */
    events: Event[]

    /**
     * The absolute offset.
     */
    offset: string

    /**
     * Assigned by the server. Useful for correlating logs.
     */
    transactionId: string

    /**
     * The workflow identifier used in command submission.
     */
    workflowId?: string
}