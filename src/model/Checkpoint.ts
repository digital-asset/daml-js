// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {LedgerOffset} from './LedgerOffset';
import {Timestamp} from './Timestamp';

/**
 * Checkpoints may be used to:
 *
 * - detect time out of commands.
 * - provide an offset which can be used to restart consumption.
 *
 * Example:
 *
 * ```
 * {
 *     recordTime: {
 *         seconds: 1554382900
 *         nanoseconds: 0
 *     },
 *     offset: {
 *         offsetType: 'absolute',
 *         absolute: LedgerOffsetBoundaryValue.END
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
 * @see LedgerOffset
 */
export interface Checkpoint {
    recordTime: Timestamp
    offset: LedgerOffset
}