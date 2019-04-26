// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {union} from "./Union";
import {CreateCommandValidation} from "./CreateCommandValidation";
import {ExerciseCommandValidation} from "./ExerciseCommandValidation";

function values() {
    return {
        create: CreateCommandValidation,
        exercise: ExerciseCommandValidation
    };
}

export const CommandValidation = union('Command', 'commandType', values);
