// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Example:
 *
 * ```
 * {
 *     ledgerId: 'my-sandbox'
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 */
export interface GetLedgerIdentityResponse {

    /**
     * The identifier of the ledger exposed by the server.
     *
     * Requests submitted with the wrong ledger ID will result in ``NOT_FOUND`` gRPC errors.
     */
    ledgerId: string
}