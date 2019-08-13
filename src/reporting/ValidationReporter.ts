// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ValidationTree} from "../validation/Validation";

export interface ValidationReporter {
    render(tree: ValidationTree): string
}
