// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {Variant} from "./Variant";
import {Record} from "./Record";

export interface RecordValue {
    kind: 'record'
    record: Record
}

export interface VariantValue {
    kind: 'variant'
    variant: Variant
}

export interface ContractIdValue {
    kind: 'contractId'
    contractId: string
}

export interface ListValue {
    kind: 'list'
    list: Value[]
}

/**
 * Represented as a {string} to avoid losing precision
 */
export interface Int64Value {
    kind: 'int64'
    int64: string
}

/**
 * Represented as a {string} to avoid losing precision
 */
export interface DecimalValue {
    kind: 'decimal'
    decimal: string
}

export interface TextValue {
    kind: 'text',
    text: string
}

/**
 * Represented as a {string} to avoid losing precision
 */
export interface TimestampValue {
    kind: 'timestamp',
    timestamp: string
}

export interface PartyValue {
    kind: 'party',
    party: string
}

export interface BoolValue {
    kind: 'bool',
    bool: boolean
}

export interface UnitValue {
    kind: 'unit'
}

/**
 * Represented as a {string} for consistency with
 * other numeric types in this union. This also
 * allows the type to remain stable in the face
 * of prospective expansions of the underlying
 * type to a 64-bit encoding.
 */
export interface DateValue {
    kind: 'date',
    date: string
}

export interface OptionalValue {
    kind: 'optional'
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
