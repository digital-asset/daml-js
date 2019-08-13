// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Uses the `offsetType` string type tag to differentiate between types in the union.
 */
export type LedgerOffset = LedgerOffsetBoundary | LedgerOffsetAbsolute;

export enum LedgerOffsetBoundaryValue {

    /**
     * Refers to the first transaction.
     */
    BEGIN,

    /**
     * Refers to the currently last transaction, which is a moving target.
     */
    END

}

/**
 * Example:
 *
 * ```
 * {
 *     offsetType: 'boundary',
 *     boundary: LedgerOffsetBoundaryValue.BEGIN
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see LedgerOffsetBoundaryValue
 */
export interface LedgerOffsetBoundary {

    /**
     * A fixed type tag to denote this object as a boundary offset
     */
    offsetType: 'boundary'
    boundary: LedgerOffsetBoundaryValue
}


/**
 * Example:
 *
 * ```
 * {
 *     offsetType: 'absolute',
 *     absolute: '42'
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 */
export interface LedgerOffsetAbsolute {

    /**
     * A fixed type tag to denote this object as an absolute offset
     */
    offsetType: 'absolute',

    /**
     * Absolute values are acquired by reading the transactions in the stream.
     * The offsets can be compared. The format may vary between implementations.
     * It is either a string representing an ever-increasing integer, or
     * a composite string containing ``<block-hash>-<block-height>-<event-id>``; ordering
     * requires comparing numerical values of the second, then the third element.
     */
    absolute: string
}