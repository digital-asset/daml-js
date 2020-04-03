// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {LedgerConfiguration} from "./LedgerConfiguration";

/**
 * LedgerConfiguration contains parameters of the ledger instance that may be useful to clients.
 *
 * Example:
 *
 * ```
 * {
 *     config: {
 *         maxTtl: {
 *             seconds: 5,
 *             nanoseconds: 0
 *         },
 *         minTtl: {
 *             seconds: 0,
 *             nanoseconds: 0
 *         }
 *     }
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see LedgerConfiguration
 * @see Timestamp
 */
export interface GetLedgerConfigurationResponse {

    /**
     * The latest ledger configuration.
     */
    config: LedgerConfiguration
}