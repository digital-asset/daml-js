// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ValidationTree} from "../validation/Validation";

export interface ValidationReporter {
    render(tree: ValidationTree): string
}
