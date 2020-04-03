// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Example:
 *
 * ```
 * {
 *     transactionId: 'some-tx-id'
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 */
export interface SubmitAndWaitForTransactionIdResponse {

    /**
     * The id of the transaction that resulted from the submitted command.
     */
    transactionId: string

}