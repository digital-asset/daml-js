// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {ValidationReporter} from "./ValidationReporter";
import {ValidationTree} from "../validation/Validation";

export const JSONReporter: ValidationReporter = {
    render(tree: ValidationTree): string {
        return JSON.stringify(tree);
    }
};