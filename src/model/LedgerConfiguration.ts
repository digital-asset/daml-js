// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Duration} from "./Duration";

/**
 * LedgerConfiguration contains parameters of the ledger instance that may be useful to clients.
 *
 * Example:
 *
 * ```
 * {
 *     maxDeduplicationTime: {
 *         seconds: 120,
 *         nanoseconds: 0
 *     },
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see Duration
 */
export interface LedgerConfiguration {

    /**
     * Maximum duration of the deduplication window
     */
    maxDeduplicationTime: Duration

}