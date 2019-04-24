// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {init, typeOf, UnionValidation, Validation, ValidationTree} from "./Validation";
import {inspect} from "util";

export function union<A extends { kind: string }>(type: string, values: () => { [_ in A['kind']]: Validation }): UnionValidation<A> {
    return {
        type: type,
        values: values,
        validate(value: any, key?: string, tree?: ValidationTree): ValidationTree {
            const node = init(key, tree);
            const actualType = typeOf(value);
            if (actualType !== 'object') {
                node.errors.push({
                    kind: 'type-error',
                    expectedType: type,
                    actualType: actualType
                });
                return node;
            }
            const typeTags: any = values();
            const typeTag = value['kind'];
            if (typeTag in typeTags) {
                const validation = typeTags[typeTag] as Validation;
                if (key && tree) {
                    return validation.validate(value, key, tree);
                } else {
                    return validation.validate(value);
                }
            } else if (typeTag === null || typeTag === undefined) {
                node.errors.push({
                    kind: 'missing-type-tag',
                    expectedTypeTags: Object.keys(typeTags)
                });
                return node;
            } else {
                node.errors.push({
                    kind: 'unexpected-type-tag',
                    expectedTypeTags: Object.keys(typeTags),
                    actualTypeTag: typeof typeTag === 'string' ? typeTag : inspect(typeTag)
                });
                return node;
            }
        }
    };
}