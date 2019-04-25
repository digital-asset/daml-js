// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

export type ValidationError = MissingKey | TypeError | UnexpectedKey | NonUniqueUnion

export interface MissingKey {
    kind: 'missing-key'
    expectedKey: string
    expectedType: string
}

export interface TypeError {
    kind: 'type-error'
    expectedType: string
    actualType: string
}

export interface UnexpectedKey {
    kind: 'unexpected-key'
    key: string
}

export interface NonUniqueUnion {
    kind: 'non-unique-union',
    keys: string[]
}

export interface ValidationTree {
    errors: ValidationError[]
    children: Record<string, ValidationTree>
}

export function isValid(tree: ValidationTree): boolean {
    return tree.errors.length === 0 && Object.keys(tree.children).every(child => isValid(tree.children[child]))
}

export interface Validation {
    type: string

    validate(value: any): ValidationTree

    validate(value: any, key: string, validation: ValidationTree): ValidationTree
}

export interface UnionValidation<A extends object> extends Validation {
    values(): Record<keyof A, Validation>
}

export interface ObjectValidation<A extends object> extends Validation {
    required(): RequiredFieldsValidators<A>

    optional(): OptionalFieldsValidators<A>
}

export const noFields = () => ({});

export function init(key?: string, validation?: ValidationTree): ValidationTree {
    const node: ValidationTree = {
        children: {},
        errors: []
    };
    if (key && validation) {
        validation.children[key] = node;
    }
    return node;
}

export function typeOf(value: any): 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'null' | 'object' | 'function' | 'array' {
    if (value === null) return 'null';
    const t = typeof value;
    return t === 'object' && Array.isArray(value) ? 'array' : t;
}

/**
 * Extracts required keys as a literal type union
 */
export type RequiredKeys<T> = { [K in keyof T]: {} extends Pick<T, K> ? never : K } extends { [_ in keyof T]: infer U }
    ? {} extends U
        ? never
        : U
    : never

/**
 * Extracts optional keys as a literal type union
 */
export type OptionalKeys<T> = { [K in keyof T]: T extends Record<K, T[K]> ? never : K } extends {
        [_ in keyof T]: infer U
    }
    ? {} extends U
        ? never
        : U
    : never

export type RequiredFields<K extends object, V> = Record<RequiredKeys<K>, V>
export type RequiredFieldsValidators<K extends object> = RequiredFields<K, Validation>

export type OptionalFields<K extends object, V> = Record<OptionalKeys<K>, V>
export type OptionalFieldsValidators<K extends object> = OptionalFields<K, Validation>