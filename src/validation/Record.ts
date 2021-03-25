// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {init, typeOf, Validation, ValidationTree} from "./Validation";

export function record(values: Validation): Validation {
    return {
        type: `Record<string, ${values.type}>`,
        validate(value: any, key?: string, validation?: ValidationTree): ValidationTree {
            const node = init(key, validation);
            const actualType = typeOf(value);
            if (actualType !== 'object') {
                node.errors.push({
                    errorType: 'type-error',
                    expectedType: this.type,
                    actualType: actualType
                })
            } else {
                for (const key in value) {
                    values.validate(value[key], key, node);
                }
            }
            return validation || node;
        }
    }
}