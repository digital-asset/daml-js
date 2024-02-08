// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {init, typeOf, Validation, ValidationError, ValidationTree} from "./Validation";

export function native(type: 'number' | 'string' | 'boolean'): Validation {
    return {
        type: type,
        validate(value: any, key?: string, validation?: ValidationTree): ValidationTree {
            const node = init(key, validation);
            const actualType = typeOf(value);
            if (actualType !== type) {
                const error: ValidationError = {
                    errorType: 'type-error',
                    expectedType: type,
                    actualType: actualType
                };
                node.errors.push(error);
            }
            return validation || node;
        }
    }
}