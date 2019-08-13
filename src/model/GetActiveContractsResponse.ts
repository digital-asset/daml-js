// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {CreatedEvent} from "./CreatedEvent";

/**
 * Example:
 *
 * ```
 * {
 *     offset: '42',
 *     workflowId: 'some-workflow-id',
 *     activeContracts: [
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
 *     ]
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see CreatedEvent
 * @see Identifier
 * @see Record
 */
export interface GetActiveContractsResponse {

    /**
     * Included in the last message.
     * The client should start consuming the transactions endpoint with this offset.
     */
    offset: string

    /**
     * The workflow that created the contracts.
     */
    workflowId?: string

    /**
     * The list of contracts that were introduced by the workflow with the given workflow identifier at the offset.
     */
    activeContracts?: CreatedEvent[]
}