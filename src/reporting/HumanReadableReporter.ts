// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ValidationReporter} from "./ValidationReporter";
import {isValid, ValidationError, ValidationTree} from "../validation/Validation";

function spellOutError(error: ValidationError): string {
    switch (error.errorType) {
        case 'missing-key':
            return `Missing key ${error.expectedKey} of type ${error.expectedType}`;
        case 'unexpected-key':
            return `Unexpected key ${error.key} found`;
        case 'missing-type-tag':
            return `Missing type tag (expected one of ${error.expectedTypeTags.join(', ')})`;
        case 'unexpected-type-tag':
            return `Unknown type tag ${error.actualTypeTag} (expected one of ${error.expectedTypeTags.join(', ')})`;
        case 'type-error':
            return `Type error, ${error.expectedType} expected but got ${error.actualType}`;
        case 'invalid-integer-string':
            return `Invalid string representation: "${error.actualValue}" cannot be parsed into an integer`;
    }
}

function buildErrorMessage(tree: ValidationTree, indent: number = 0): string {
    let errors = '';
    for (const error of tree.errors) {
        errors += `\n${' '.repeat(indent)}✗ ${spellOutError(error)}`;
    }
    for (const child in tree.children) {
        if (!isValid(tree.children[child])) {
            return `${errors}\n${' '.repeat(indent)}▸ ${child}${buildErrorMessage(tree.children[child], indent + 2)}`;
        }
    }
    return errors;
}

export const HumanReadableReporter: ValidationReporter = {
    render(tree: ValidationTree): string {
        return `! Validation error${buildErrorMessage(tree)}`;
    }
};