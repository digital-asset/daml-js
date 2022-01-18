// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Command} from "./Command";

/**
 * A composite command that groups multiple commands together.
 *
 * Example:
 *
 * ```
 * {
 *     applicationId: 'MyAwesomeApplication',
 *     commandId: 'fa7c46eb-bbf9-4eb9-9302-1123b42ce244',
 *     party: 'Alice',
 *     workflowId: 'some-workflow-id',
 *     list: [
 *         {
 *             commandType: 'create',
 *             templateId: {
 *                 packageId: 'some-package-id',
 *                 moduleName: 'SomeModule',
 *                 entityName: 'SomeTemplate'
 *             },
 *             arguments: {
 *                 fields: {
 *                     owner: {
 *                         valueType: 'party',
 *                         party: 'Alice'
 *                     }
 *                 }
 *             }
 *         }
 *     ]
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
export interface Commands {

    /**
     * Uniquely identifies the application (or its part) that issued the command. This is used in tracing
     * across different components and to let applications subscribe to their own submissions only.
     */
    applicationId: string

    /**
     * Unique command identifier. This number should be unique for each new command within an application domain.
     * It can be used for matching the requests with their respective completions.
     */
    commandId: string

    /**
     * Party on whose behalf the command should be executed. It is up to the server to verify that the
     * authorisation can be granted and that the connection has been authenticated for that party.
     */
    party: string

    /**
     * Identifier of the on-ledger workflow that this command is a part of.
     */
    workflowId?: string

    /**
     * Individual elements of this atomic command. Must be non-empty.
     */
    list: Command[]
}