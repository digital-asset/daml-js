// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Timestamp} from "./Timestamp";

/**
 * The current time according to the ledger server.
 *
 * Example:
 *
 * ```
 * {
 *     currentTime: {
 *         seconds: 1554382900,
 *         nanoseconds: 0
 *     }
 * }
 * ```
 *
 * Please note that the {@link Timestamp} used here is different from
 * the {@link TimestampValue} used to represent DAML timestamps.
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see Timestamp
 */
export interface GetTimeResponse {
    currentTime: Timestamp
}