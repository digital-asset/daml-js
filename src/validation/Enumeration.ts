// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {init, typeOf, Validation, ValidationError, ValidationTree} from "./Validation";

function valuesOf(enumeration: { [_: number]: string }): string[] {
    return Object.keys(enumeration).filter(k => typeof enumeration[k as any] === "number").map(k => enumeration[k as any]);
}

// NOTE: works only for `enum`s without custom initializers
export function enumeration(enumeration: { [_: number]: string }, type: string): Validation {
    return {
        type: type,
        validate(value: any, key?: string, validation?: ValidationTree): ValidationTree {
            const node = init(key, validation);
            const values = valuesOf(enumeration);
            if (!values.some(v => v === value)) {
                const error: ValidationError = {
                    errorType: 'type-error',
                    expectedType: this.type,
                    actualType: typeOf(value)
                };
                node.errors.push(error);
            }
            return validation || node;
        }
    }
};