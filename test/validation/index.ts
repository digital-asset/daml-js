// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {ValidationError} from "../../src/validation/Validation";

export function pickFrom<A>(as: A[]): A {
    return as[(Math.floor(Math.random()) * as.length) % as.length];
}

function equalsDisregardingOrder(left: string[], right: string[]): boolean {
    const l = [...left].sort();
    const r = [...right].sort();
    return l.every((v, i) => v === r[i]);
}

export function containsError(
    errors: ValidationError[],
    check: ValidationError
): boolean {
    return errors.some(error => {
        switch (error.__type__) {
            case 'type-error':
                return (
                    check.__type__ === 'type-error' &&
                    check.actualType === error.actualType &&
                    check.expectedType === error.expectedType
                );
            case 'unexpected-key':
                return check.__type__ === 'unexpected-key' && check.key === error.key;
            case 'missing-type-tag':
                return (
                    check.__type__ === 'missing-type-tag' &&
                    equalsDisregardingOrder(check.expectedTypeTags, error.expectedTypeTags)
                );
            case 'unexpected-type-tag':
                return (
                    check.__type__ === 'unexpected-type-tag' &&
                    check.actualTypeTag === error.actualTypeTag &&
                    equalsDisregardingOrder(check.expectedTypeTags, error.expectedTypeTags)
                );
            case 'missing-key':
                return (
                    check.__type__ === 'missing-key' &&
                    check.expectedType === error.expectedType &&
                    check.expectedKey === error.expectedKey
                );
        }
    });
}
