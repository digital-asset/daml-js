// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Example:
 *
 * ```
 * {
 *     transactionId: 'some-tx-id',
 *     requestingParties: [
 *         'Alice',
 *         'Bob'
 *     ]
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 */
export interface GetTransactionByIdRequest {

    /**
     * The identifier of a particular transaction.
     */
    transactionId: string

    /**
     * The parties whose events the client expects to see.
     * Events that are not visible for the parties in this collection will not be present in the response.
     */
    requestingParties: string[]

}