// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Commands} from "./Commands";

/**
 * These commands are atomic, and will become transactions.
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
 * @see Timestamp
 * @see Command
 * @see Identifier
 * @see Record
 */
export interface SubmitAndWaitRequest {

    /**
     * The commands to be submitted.
     */
    commands: Commands
}