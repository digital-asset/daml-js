// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {init, typeOf, Validation, ValidationError, ValidationTree} from "./Validation";

export function array(items: Validation): Validation {
    return {
        type: `Array<${items.type}>`,
        validate(value: any, key?: string, validation?: ValidationTree): ValidationTree {
            const node = init(key, validation);
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    items.validate(item, index.toString(), node);
                });
            } else {
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
}