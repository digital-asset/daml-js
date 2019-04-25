// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {ValidationReporter} from "./ValidationReporter";
import {isValid, ValidationError, ValidationTree} from "../validation/Validation";

function spellOutError(error: ValidationError): string {
    switch (error.kind) {
        case 'missing-key':
            return `Missing key ${error.expectedKey} of type ${error.expectedType}`;
        case 'non-unique-union':
            if (error.keys.length === 0) {
                return `Exactly one value must be defined in an union but none are`;
            } else {
                return `Exactly one value must be defined in an union but ${error.keys.length} are (${error.keys.join(', ')})`;
            }
        case 'type-error':
            return `Type error, ${error.expectedType} expected but got ${error.actualType}`;
        case 'unexpected-key':
            return `Unexpected key ${error.key} found`;
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
}