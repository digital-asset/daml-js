// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Timestamp} from "./Timestamp";
import {TreeEvent} from "./TreeEvent";

/**
 * Complete view of an on-ledger transaction.
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
 *     offset: '42',
 *     transactionId: 'some-tx-id',
 *     workflowId: 'some-workflow-id',
 *     eventsById: {
 *         'some-event-id': {
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
 *     },
 *     rootEventIds: [
 *         'event-1',
 *         'event-2'
 *     ]
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see Timestamp
 * @see TreeEvent
 * @see Record
 */
export interface TransactionTree {

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
     * The absolute offset.
     */
    offset: string

    /**
     * Assigned by the server. Useful for correlating logs.
     */
    transactionId: string

    /**
     * The workflow identifier used in command submission.
     *
     * Only set if the `workflowIdd` for the command was set.
     */
    workflowId?: string

    /**
     * Changes to the ledger that were caused by this transaction. Nodes of the transaction tree.
     */
    eventsById: Record<string, TreeEvent>

    /**
     * Roots of the transaction tree.
     */
    rootEventIds: string[]
}