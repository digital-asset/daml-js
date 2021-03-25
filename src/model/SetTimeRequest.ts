// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Timestamp} from './Timestamp';

/**
 * Example:
 *
 * ```
 * {
 *     currentTime: {
 *         seconds: 0,
 *         nanoseconds: 0,
 *     },
 *     newTime: {
 *         seconds: 1,
 *         nanoseconds: 0
 *     }
 * }
 * ```
 *
 * Please note that the {@link Timestamp} used here is different from
 * the {@link TimestampValue} used to represent DAML timestamps.
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 */
export interface SetTimeRequest {
    currentTime: Timestamp
    newTime: Timestamp
}