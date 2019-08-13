// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {init, typeOf, UnionValidation, Validation, ValidationTree} from "./Validation";
import {inspect} from "util";

export function union<Tag extends string, A extends { [_ in Tag]: string }>(type: string, tag: Tag, values: () => { [_ in A[Tag]]: Validation }): UnionValidation<Tag, A> {
    return {
        tag: tag,
        type: type,
        values: values,
        validate(value: any, key?: string, tree?: ValidationTree): ValidationTree {
            const node = init(key, tree);
            const actualType = typeOf(value);
            if (actualType !== 'object') {
                node.errors.push({
                    errorType: 'type-error',
                    expectedType: type,
                    actualType: actualType
                });
                return node;
            }
            const typeTags: any = values();
            const typeTag = value[this.tag];
            if (typeTag in typeTags) {
                const validation = typeTags[typeTag] as Validation;
                if (key && tree) {
                    return validation.validate(value, key, tree);
                } else {
                    return validation.validate(value);
                }
            } else if (typeTag === null || typeTag === undefined) {
                node.errors.push({
                    errorType: 'missing-type-tag',
                    expectedTypeTags: Object.keys(typeTags)
                });
                return node;
            } else {
                node.errors.push({
                    errorType: 'unexpected-type-tag',
                    expectedTypeTags: Object.keys(typeTags),
                    actualTypeTag: typeof typeTag === 'string' ? typeTag : inspect(typeTag)
                });
                return node;
            }
        }
    };
}