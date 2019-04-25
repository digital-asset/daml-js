// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {Variant} from "./Variant";
import {Record} from "./Record";

export interface RecordValue {
    __type__: 'record'
    record: Record
}

export interface VariantValue {
    __type__: 'variant'
    variant: Variant
}

export interface ContractIdValue {
    __type__: 'contractId'
    contractId: string
}

export interface ListValue {
    __type__: 'list'
    list: Value[]
}

/**
 * Represented as a {string} to avoid losing precision
 */
export interface Int64Value {
    __type__: 'int64'
    int64: string
}

/**
 * Represented as a {string} to avoid losing precision
 */
export interface DecimalValue {
    __type__: 'decimal'
    decimal: string
}

export interface TextValue {
    __type__: 'text',
    text: string
}

/**
 * Represented as a {string} to avoid losing precision
 */
export interface TimestampValue {
    __type__: 'timestamp',
    timestamp: string
}

export interface PartyValue {
    __type__: 'party',
    party: string
}

export interface BoolValue {
    __type__: 'bool',
    bool: boolean
}

export interface UnitValue {
    __type__: 'unit'
}

/**
 * Represented as a {string} for consistency with
 * other numeric types in this union. This also
 * allows the type to remain stable in the face
 * of prospective expansions of the underlying
 * type to a 64-bit encoding.
 */
export interface DateValue {
    __type__: 'date',
    date: string
}

export interface OptionalValue {
    __type__: 'optional'
    optional?: Value
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
