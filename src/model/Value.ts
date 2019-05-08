// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Record} from "./Record";
import {Variant} from "./Variant";

export interface RecordValue extends Record {
    valueType: 'record'
}

export interface VariantValue extends Variant {
    valueType: 'variant'
}

export interface ContractIdValue {
    valueType: 'contractId'
    contractId: string
}

export interface ListValue {
    valueType: 'list'
    list: Value[]
}

/**
 * Represented as a {string} to avoid losing precision
 */
export interface Int64Value {
    valueType: 'int64'
    int64: string
}

/**
 * Represented as a {string} to avoid losing precision
 */
export interface DecimalValue {
    valueType: 'decimal'
    decimal: string
}

export interface TextValue {
    valueType: 'text',
    text: string
}

/**
 * Represented as a {string} to avoid losing precision
 */
export interface TimestampValue {
    valueType: 'timestamp',
    timestamp: string
}

export interface PartyValue {
    valueType: 'party',
    party: string
}

export interface BoolValue {
    valueType: 'bool',
    bool: boolean
}

export interface UnitValue {
    valueType: 'unit'
}

/**
 * Represented as a {string} for consistency with
 * other numeric types in this union. This also
 * allows the type to remain stable in the face
 * of prospective expansions of the underlying
 * type to a 64-bit encoding.
 */
export interface DateValue {
    valueType: 'date',
    date: string
}

export interface OptionalValue {
    valueType: 'optional'
    optional?: Value
}

export interface MapValue {
    valueType: 'map',
    map: { [k: string]: Value }
}

export type Value =
    RecordValue
    | VariantValue
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
