// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Status} from "./Status";

/**
 * A completion represents the status of a submitted command on the ledger: it can be successful or failed.
 *
 * Example:
 *
 * ```
 * {
 *     commandId: 'some-command-id',
 *     status: {
 *         code: 42,
 *         message: 'ANSWER'.
 *         details: []
 *     },
 *     transactionId: 'some-tx-id'
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see Status
 * @see Any
 */
export interface Completion {

    /**
     * The identifier of the succeeded or failed command.
     */
    commandId: string

    /**
     * Identifies the exact type of the error.
     * For example, malformed or double spend transactions will result in a `INVALID_ARGUMENT` status.
     * Transactions with invalid time time windows (which may be valid at a later date) will result in an `ABORTED` error.
     */
    status?: Status

    /**
     * The identifier of the transaction that resulted from the command with the aforementioned command identifier.
     * Only set for successfully executed commands.
     */
    transactionId?: string
}