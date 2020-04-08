// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Record} from "./Record";
import {Variant} from "./Variant";
import {Identifier} from "./Identifier";

/**
 * Contains nested values.
 *
 * ```
 * {
 *     valueType: 'record',
 *     fields: {
 *         aFlag: {
 *             valueType: 'bool',
 *             bool: true
 *         },
 *         aString: {
 *             valueType: 'text',
 *             text: 'a string'
 *         }
 *     }
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see Identifier
 * @see Value
 */
export interface RecordValue extends Record {
    valueType: 'record'
}

/**
 * A value with alternative representations.
 *
 * Example:
 *
 * ```
 * {
 *     valueType: 'variant',
 *     constructor: 'SomeVariant',
 *     value: {
 *         valueType: 'record',
 *         fields: {
 *             a: { valueType: 'bool', bool: true },
 *             b: { valueType: 'int64', int64: '42' }
 *         }
 *     }
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see Identifier
 * @see Value
 */
export interface VariantValue extends Variant {
    valueType: 'variant'
}

/**
 * A value with alternative representations.
 *
 * Example:
 *
 * ```
 * {
 *     valueType: 'enum',
 *     constructor: 'Red'
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see Identifier
 */
export interface EnumValue {
    valueType: 'enum'
    constructor: string
    enumId?: Identifier
}

/**
 * Identifier of an on-ledger contract. Commands which reference an unknown or already archived contract ID will fail.
 *
 * Example:
 *
 * ```
 * {
 *     valueType: 'contractId',
 *     contractId: 'bbd63bda774bd92246d0'
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 */
export interface ContractIdValue {
    valueType: 'contractId'
    contractId: string
}

/**
 * Represents a homogeneous list of values.
 *
 * Example:
 *
 * ```
 * {
 *     valueType: 'list',
 *     list: [
 *         { valueType: 'party', party: 'Alice' },
 *         { valueType: 'party', party: 'Bob' }
 *     ]
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 */
export interface ListValue {
    valueType: 'list'
    list: Value[]
}

/**
 * Represented as a string to avoid losing precision.
 *
 * Example:
 *
 * ```
 * {
 *     valueType: 'int64',
 *     int64: '42'
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 */
export interface Int64Value {
    valueType: 'int64'
    int64: string
}

/**
 * A decimal value with precision 38 (38 decimal digits), of which
 * 10 after the comma / period. In other words a decimal is a number
 * of the form `x / 10^10` where `|x| < 10^38`.
 *
 * The number can start with a leading sign [+-] followed by digits.
 *
 * Represented as a string to avoid losing precision.
 *
 * Example:
 *
 * ```
 * {
 *     valueType: 'decimal',
 *     decimal: '42'
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 */
export interface DecimalValue {
    valueType: 'decimal'
    decimal: string
}

/**
 * A string.
 *
 * Example:
 *
 * ```
 * {
 *     valueType: 'text',
 *     text: 'a string'
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 */
export interface TextValue {
    valueType: 'text',
    text: string
}

/**
 * Microseconds since the UNIX epoch. Can go backwards. Fixed
 * since the vast majority of values will be greater than
 * 2^28, since currently the number of microseconds since the
 * epoch is greater than that. Range: 0001-01-01T00:00:00Z to
 * 9999-12-31T23:59:59.999999Z, so that we can convert to/from
 * [RFC3339](https://www.ietf.org/rfc/rfc3339.txt).
 * 
 * Represented as a string to avoid losing precision.
 *
 * Example:
 *
 * ```
 * {
 *     valueType: 'timestamp',
 *     timestamp: '1554382900'
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 */
export interface TimestampValue {
    valueType: 'timestamp',
    timestamp: string
}

/**
 * An agent operating on the ledger.
 *
 * Example:
 *
 * ```
 * {
 *     valueType: 'party',
 *     party: 'Alice'
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 */
export interface PartyValue {
    valueType: 'party',
    party: string
}

/**
 * True or false.
 *
 * Example:
 *
 * ```
 * {
 *     valueType: 'bool',
 *     bool: true
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 */
export interface BoolValue {
    valueType: 'bool',
    bool: boolean
}

/**
 * This value is used for example for choices that don't take any arguments.
 *
 * Example:
 *
 * ```
 * {
 *     valueType: 'unit'
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 */
export interface UnitValue {
    valueType: 'unit'
}

/**
 * Days since the unix epoch. Can go backwards. Limited from
 * 0001-01-01 to 9999-12-31, also to be compatible with
 * [RFC3339](https://www.ietf.org/rfc/rfc3339.txt).
 * 
 * Represented as a string for consistency with
 * other numeric types in this union. This also
 * allows the type to remain stable in the face
 * of prospective expansions of the underlying
 * type to a 64-bit encoding.
 *
 * Example:
 *
 * ```
 * {
 *     valueType: 'date',
 *     date: '17990'
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 */
export interface DateValue {
    valueType: 'date',
    date: string
}

/**
 * Represents a value that may or may not be there.
 *
 * Example:
 *
 * ```
 * {
 *     valueType: 'optional',
 *     optional: { valueType: 'text', text: 'a string' }
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 */
export interface OptionalValue {
    valueType: 'optional'
    optional?: Value
}

/**
 * A dictionary from strings to {@link Value}s.
 *
 * Example:
 *
 * ```
 * {
 *     valueType: 'map',
 *     map: {
 *         a: { valueType: 'bool', bool: true },
 *         b: { valueType: 'text', text: 'a string' }
 *     }
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 */
export interface MapValue {
    valueType: 'map',
    map: { [k: string]: Value }
}

/**
 * Encodes values that the ledger accepts as command arguments and emits as contract arguments.
 *
 * Uses the `valueType` string type tag to differentiate between types in the union.
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 */
export type Value =
    RecordValue
    | VariantValue
    | EnumValue
    | ContractIdValue
    | ListValue
    | Int64Value
    | DecimalValue
    | TextValue
    | TimestampValue
    | PartyValue
    | BoolValue
    | UnitValue
    | DateValue
    | OptionalValue
    | MapValue
