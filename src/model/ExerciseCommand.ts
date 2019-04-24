// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {Identifier} from "./Identifier";
import {Value} from "./Value";

export interface ExerciseCommand {
    kind: 'exercise',
    templateId: Identifier
    choice: string
    contractId: string
    argument: Value
}