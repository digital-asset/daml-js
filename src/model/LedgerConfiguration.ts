// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Duration} from "./Duration";

/**
 * LedgerConfiguration contains parameters of the ledger instance that may be useful to clients.
 *
 * Example:
 *
 * ```
 * {
 *     maxTtl: {
 *         seconds: 5,
 *         nanoseconds: 0
 *     },
 *     minTtl: {
 *         seconds: 0,
 *         nanoseconds: 0
 *     }
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see Duration
 */
export interface LedgerConfiguration {

    /**
     * Minimum difference between ledger effective time and maximum record time in submitted commands.
     */
    maxTtl: Duration

    /**
     * Maximum difference between ledger effective time and maximum record time in submitted commands.
     */
    minTtl: Duration

}