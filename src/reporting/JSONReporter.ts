// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ValidationReporter} from "./ValidationReporter";
import {ValidationTree} from "../validation/Validation";

export const JSONReporter: ValidationReporter = {
    render(tree: ValidationTree): string {
        return JSON.stringify(tree);
    }
};