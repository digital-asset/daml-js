// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Transaction} from "./Transaction";

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
 *         events: [
 *             {
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
 *         ],
 *         offset: '42',
 *         transactionId: 'some-tx-id',
 *         workflowId: 'some-workflow-id'
 *     }
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see Transaction
 * @see Timestamp
 * @see Event
 * @see Identifier
 * @see Record
 * @see Value
 */
export interface GetFlatTransactionResponse {
    transaction: Transaction
}