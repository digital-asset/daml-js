// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Validation, ValidationTree} from "./Validation";
import {native} from "./Native";

export const integerString: Validation = {
    type: 'integerString',
    validate(value: any, key?: string, validation?: ValidationTree): ValidationTree {
        const node = key !== undefined && validation !== undefined ? native('string').validate(value, key, validation) : native('string').validate(value);
        if (typeof value === "string") {
            if (value.search(/^[-+]?[0-9]+$/) === -1) {
                node.errors.push({
                    errorType: "invalid-integer-string",
                    actualValue: value
                });
            }
        }
        return validation || node;
    }
};