// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Commands} from "./Commands";

/**
 * The submitted commands will be processed atomically in a single transaction.
 *
 * Moreover, each {@link Command} in `commands` will be executed in the order specified by the request.
 *
 * Example:
 *
 * ```
 * {
 *     commands: {
 *         applicationId: 'MyAwesomeApplication',
 *         commandId: 'fa7c46eb-bbf9-4eb9-9302-1123b42ce244',
 *         party: 'Alice',
 *         workflowId: 'some-workflow-id',
 *         ledgerEffectiveTime: {
 *             seconds: 1554382900,
 *             nanoseconds: 0
 *         },
 *         maximumRecordTime: {
 *             seconds: 1554382900,
 *             nanoseconds: 500000000
 *         },
 *         list: [
 *             {
 *                 commandType: 'create',
 *                 templateId: {
 *                     packageId: 'some-package-id',
 *                     moduleName: 'SomeModule',
 *                     entityName: 'SomeTemplate'
 *                 },
 *                 arguments: {
 *                     fields: {
 *                         owner: {
 *                             valueType: 'party',
 *                             party: 'Alice'
 *                         }
 *                     }
 *                 }
 *             }
 *         ]
 *     }
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see Commands
 * @see Timestamp
 * @see Command
 * @see Identifier
 * @see Record
 */
export interface SubmitRequest {
    commands: Commands
}