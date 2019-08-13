// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {TransactionTree} from "./TransactionTree";

/**
 * Example:
 *
 * ```
 * {
 *     transaction: {
 *         commandId: 'some-command-id',
 *         effectiveAt: {
 *             seconds: 1554382900
 *             nanoseconds: 0
 *         },
 *         offset: '42',
 *         transactionId: 'some-tx-id',
 *         workflowId: 'some-workflow-id',
 *         eventsById: {
 *             'some-event-id': {
 *                 eventType: 'created',
 *                 eventId: 'some-event-id',
 *                 contractId: 'some-contract-id',
 *                 templateId: {
 *                     packageId: 'my-package-id',
 *                     moduleName: 'SomeModule',
 *                     entityName: 'SomeTemplate'
 *                 },
 *                 arguments: {
 *                     fields: {
 *                         someKey: { valueType: 'bool', bool: true }
 *                     }
 *                 },
 *                 witnessParties: [ 'Alice', 'Bob' ]
 *             }
 *         },
 *         rootEventIds: [
 *             'event-1',
 *             'event-2'
 *         ]
 *     }
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see TransactionTree
 * @see Timestamp
 * @see TreeEvent
 * @see Record
 */
export interface GetTransactionResponse {
    transaction: TransactionTree
}