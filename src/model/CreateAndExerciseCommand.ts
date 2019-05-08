// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Identifier} from './Identifier';
import {Record} from './Record';
import {Value} from "./Value";

export interface CreateAndExerciseCommand {
    commandType: 'createAndExercise',
    templateId: Identifier
    createArguments: Record
    choice: string
    choiceArgument: Value
}