// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ValidationReporter} from "./ValidationReporter";
import {ValidationTree} from "../validation/Validation";

export const JSONReporter: ValidationReporter = {
    render(tree: ValidationTree): string {
        return JSON.stringify(tree);
    }
};