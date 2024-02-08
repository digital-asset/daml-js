// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ValidationTree} from "../validation/Validation";

export interface ValidationReporter {
    render(tree: ValidationTree): string
}
