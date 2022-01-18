// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    BoolValue,
    ContractIdValue, DateValue,
    DecimalValue,
    EnumValue,
    Int64Value, ListValue, MapValue, OptionalValue, PartyValue,
    RecordValue,
    TextValue,
    TimestampValue, UnitValue, Value,
    VariantValue
} from "../model/Value";
import {Identifier} from "../model/Identifier";

const unit: UnitValue = {
    valueType: "unit"
};
Object.freeze(unit);

const none: OptionalValue = {
    valueType: "optional"
};
Object.freeze(none);

/**
 * These helpers are thought to make expressing DAML values more concise.
 *
 * To use them, you can either `require` them
 *
 * ```
 * const daml = require('@digitalasset/daml-ledger').daml;
 * ```
 *
 * or import them
 *
 * ```
 * import { daml } from '@digitalasset/daml-ledger';
 * ```
 */
export const ValueHelpers = {
    /**
     * Turns an array of {@link Value}s into the underlying representation for DAML tuples
     *
     * Example:
     *
     * ```
     * daml.tuple([
     *     daml.text('hello'),
     *     daml.text('world'),
     * ]);
     * ```
     * becomes
     *
     * ```
     * {
     *     valueType: 'record',
     *     fields: {
     *         0: { valueType: 'text', text: 'hello' },
     *         1: { valueType: 'text', text: 'world' }
     *     }
     * }
     * ```
     */
    tuple: (values: Value[]): RecordValue => {
        const fields: Record<string, Value> = {};
        const tuple: RecordValue = {
            valueType: 'record',
            fields: fields,
        };
        for (let i = 0; i < values.length; i++) {
            fields[i] = values[i];
        }
        return tuple;
    },
    /**
     * Turns a plain object with {@link Value}s into the underlying representation for records
     *
     * Example:
     *
     * ```
     * daml.record({
     *     a: daml.text('hello'),
     *     b: daml.text('world'),
     * });
     * ```
     * becomes
     *
     * ```
     * {
     *     valueType: 'record',
     *     fields: {
     *         a: { valueType: 'text', text: 'hello' },
     *         b: { valueType: 'text', text: 'world' }
     *     }
     * }
     * ```
     */
    record: (fields: Record<string, Value>, recordId?: Identifier): RecordValue => {
        const record: RecordValue = {
            valueType: "record",
            fields: fields,
        };
        if (recordId) {
            record.recordId = recordId;
        }
        return record;
    },
    /**
     * Wraps a constructor into the underlying representation for enums
     *
     * Example:
     *
     * ```
     * daml.enum('Red');
     * ```
     * becomes
     *
     * ```
     * {
     *     valueType: 'enum',
     *     constructor: 'Red'
     * }
     * ```
     */
    enum: (constructor: string, enumId?: Identifier): EnumValue => {
        const variant: EnumValue = {
            valueType: "enum",
            constructor: constructor
        };
        if (enumId) {
            variant.enumId = enumId;
        }
        return variant;
    },
    /**
     * Wraps a constructor and a {@link Value} into the underlying representation for variants
     *
     * Example:
     *
     * ```
     * daml.variant('Person', daml.text('Alice')));
     * ```
     * becomes
     *
     * ```
     * {
     *     valueType: 'variant',
     *     value: {
     *         valueType: 'text',
     *         text: 'Alice'
     *      }
     * }
     * ```
     */
    variant: (constructor: string, value: Value, variantId?: Identifier): VariantValue => {
        const variant: VariantValue = {
            valueType: "variant",
            constructor: constructor,
            value: value
        };
        if (variantId) {
            variant.variantId = variantId;
        }
        return variant;
    },
    /**
     * Wraps a {@link Value} into the underlying representation for optional values
     *
     * Examples:
     *
     * ```
     * daml.some(daml.text('hello, world'))
     * ```
     * becomes
     *
     * ```
     * {
     *     valueType: 'optional',
     *     optional: {
     *         valueType: 'text',
     *         text: 'hello, world'
     *      }
     * }
     * ```
     */
    some: (value: Value): OptionalValue => {
        const optional: OptionalValue = {
            valueType: "optional"
        };
        if (value !== undefined) {
            optional.optional = value;
        }
        return optional;
    },
    /**
     * The only possible value of an empty optional value
     *
     * Example:
     *
     * ```
     * daml.none
     * ```
     *
     * is
     *
     * ```
     * {
     *     valueType: 'optional'
     * }
     * ```
     */
    none: none,
    /**
     * Wraps an array of {@link Value}s into the underlying representation for lists
     *
     * Example:
     *
     * ```
     * daml.list([
     *     daml.text('hello'),
     *     daml.text('world'),
     * ]);
     * ```
     * becomes
     *
     * ```
     * {
     *     valueType: 'list',
     *     list: [
     *         { valueType: 'text', text: 'hello' },
     *         { valueType: 'text', text: 'world' }
     *     ]
     * }
     * ```
     */
    list: (values: Value[]): ListValue => {
        return {
            valueType: "list",
            list: values
        };
    },
    /**
     * Turns a plain object with {@link Value}s into the underlying representation for maps
     *
     * Example:
     *
     * ```
     * daml.map({
     *     a: daml.text('hello'),
     *     b: daml.text('world'),
     * });
     * ```
     * becomes
     *
     * ```
     * {
     *     valueType: 'map',
     *     map: {
     *         a: { valueType: 'text', text: 'hello' },
     *         b: { valueType: 'text', text: 'world' }
     *     }
     * }
     * ```
     */
    map: (map: Record<string, Value>): MapValue => {
        return {
            valueType: "map",
            map: map
        };
    },
    /**
     * Wraps a string into the underlying representation of contract identifiers.
     *
     * Example:
     *
     * ```
     * daml.contractId('00fb4a445c10')
     * ```
     *
     * becomes
     *
     * ```
     * {
     *     valueType: 'contractId',
     *     contractId: '00fb4a445c10'
     * }
     * ```
     */
    contractId: (value: string): ContractIdValue => {
        return {
            valueType: "contractId",
            contractId: value
        };
    },
    /**
     * Wraps either a string, number or bigint in the underlying signed 64-bit integer representation
     *
     * _ATTENTION_: plain JavaScript numbers lose precision outside the [-2^53, 2^53] range.
     *
     * Example:
     *
     * ```
     * daml.int64(99898)
     * ```
     *
     * becomes
     *
     * ```
     * {
     *     valueType: 'int64',
     *     int64: '99898'
     * }
     * ```
     */
    int64: (value: string | number | bigint): Int64Value => {
        return {
            valueType: "int64",
            int64: '' + value
        };
    },
    /**
     * Wraps either a string, number or bigint in the underlying arbitrary precision decimal representation
     *
     * _ATTENTION_: plain JavaScript numbers lose precision outside the [-2^53, 2^53] range.
     *
     * Example:
     *
     * ```
     * daml.decimal(99898)
     * ```
     *
     * becomes
     *
     * ```
     * {
     *     valueType: 'decimal',
     *     decimal: '99898'
     * }
     * ```
     */
    decimal: (value: string | number | bigint): DecimalValue => {
        return {
            valueType: "decimal",
            decimal: '' + value
        };
    },
    /**
     * Wraps a string into the underlying representation of text.
     *
     * Example:
     *
     * ```
     * daml.text('hello, world')
     * ```
     *
     * becomes
     *
     * ```
     * {
     *     valueType: 'text',
     *     text: 'hello, world'
     * }
     * ```
     */
    text: (value: string): TextValue => {
        return {
            valueType: "text",
            text: value
        };
    },
    /**
     * Wraps a string into the underlying representation of parties.
     *
     * Example:
     *
     * ```
     * daml.party('Alice')
     * ```
     *
     * becomes
     *
     * ```
     * {
     *     valueType: 'party',
     *     party: 'Alice'
     * }
     * ```
     */
    party: (value: string): PartyValue => {
        return {
            valueType: "party",
            party: value
        };
    },
    /**
     * Wraps a plain boolean into the underlying representation of boolean values on the ledger
     *
     * Example:
     *
     * ```
     * daml.boolean(true)
     * ```
     *
     * becomes
     *
     * ```
     * {
     *     valueType: 'bool',
     *     bool: true
     * }
     * ```
     */
    bool: (value: boolean): BoolValue => {
        return {
            valueType: "bool",
            bool: value
        };
    },
    /**
     * If given a {@link Date}, wraps its value into the underlying representation for timestamp.
     *
     * If given a number or bigint, casts it to the corresponding string value.
     *
     * If given a string, passes through unchanged. Pay extra caution when using this approach.
     *
     * _ATTENTION_: plain JavaScript numbers lose precision outside the [-2^53, 2^53] range.
     *
     * Examples:
     *
     * ```
     * daml.timestamp(new Date('1970-01-01T00:00:01Z'))
     * ```
     *
     * becomes
     *
     * ```
     * {
     *     valueType: 'timestamp',
     *     timestamp: '1000000'
     * }
     * ```
     *
     * ---
     *
     * ```
     * daml.timestamp('1000000') // strings go through unchanged
     * ```
     *
     * becomes
     *
     * ```
     * {
     *     valueType: 'timestamp',
     *     timestamp: '1000000'
     * }
     * ```
     *
     * ---
     *
     * ```
     * daml.timestamp('1970-01-01T00:00:01Z') // CAUTION: STRING GO THROUGH UNCHANGED
     * ```
     *
     * becomes
     *
     * ```
     * {
     *     valueType: 'timestamp',
     *     timestamp: '1970-01-01T00:00:01Z' // CAUTION: THIS WILL BE A RUNTIME ERROR
     * }
     * ```
     *
     * ---
     *
     * ```
     * daml.timestamp(1000000)
     * ```
     *
     * becomes
     *
     * ```
     * {
     *     valueType: 'timestamp',
     *     timestamp: '1000000'
     * }
     * ```
     */
    timestamp: (value: Date | string | number | bigint): TimestampValue => {
        if (value instanceof Date) {
            const epoch = value.getTime();
            return {
                valueType: "timestamp",
                timestamp: epoch === 0 ? '0' : `${epoch}000`
            };
        } else {
            return {
                valueType: "timestamp",
                timestamp: '' + value
            };
        }
    },
    /**
     * If given a {@link Date}, wraps its value into the underlying representation for timestamp.
     *
     * If given a number or bigint, casts it to the corresponding string value.
     *
     * If given a string, passes through unchanged. Pay extra caution when using this approach.
     *
     * _ATTENTION_: plain JavaScript numbers lose precision outside the [-2^53, 2^53] range.
     *
     * Examples:
     *
     * ```
     * daml.date(new Date('1971-01-01'))
     * ```
     *
     * becomes
     *
     * ```
     * {
     *     valueType: 'date',
     *     date: '365'
     * }
     * ```
     *
     * ---
     *
     * ```
     * daml.date('1000000') // strings go through unchanged
     * ```
     *
     * becomes
     *
     * ```
     * {
     *     valueType: 'date',
     *     date: '1000000'
     * }
     * ```
     *
     * ---
     *
     * ```
     * daml.timestamp('1970-01-01') // CAUTION: STRING GO THROUGH UNCHANGED
     * ```
     *
     * becomes
     *
     * ```
     * {
     *     valueType: 'date',
     *     date: '1970-01-01' // CAUTION: THIS WILL BE A RUNTIME ERROR
     * }
     * ```
     *
     * ---
     *
     * ```
     * daml.date(1000000)
     * ```
     *
     * becomes
     *
     * ```
     * {
     *     valueType: 'date',
     *     date: '1000000'
     * }
     * ```
     */
    date: (value: Date | string | number): DateValue => {
        if (value instanceof Date) {
            return {
                valueType: "date",
                date: '' + Math.floor(value.getTime() / 8.64e7)
            };
        } else {
            return {
                valueType: "date",
                date: '' + value
            }
        }
    },
    /**
     * The only possible value of type unit as the underlying representation
     *
     * Example:
     *
     * ```
     * daml.unit
     * ```
     *
     * is
     *
     * ```
     * {
     *     valueType: 'unit'
     * }
     * ```
     */
    unit: unit
};
