// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {init, typeOf, Validation, ValidationError, ValidationTree} from "./Validation";

export function string(literal: string): Validation {
    return {
        type: `literal<${literal}>`,
        validate(value: any, key?: string, validation?: ValidationTree): ValidationTree {
            const node = init(key, validation);
            if (value !== literal) {
                const actualType = typeOf(value);
                const error: ValidationError = {
                    __type__: 'type-error',
                    expectedType: this.type,
                    actualType: actualType
                };
                node.errors.push(error);
            }
            return validation || node;
        }
    }
}