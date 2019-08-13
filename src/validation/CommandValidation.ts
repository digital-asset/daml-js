// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {union} from "./Union";
import {CreateCommandValidation} from "./CreateCommandValidation";
import {ExerciseCommandValidation} from "./ExerciseCommandValidation";
import {CreateAndExerciseCommandValidation} from "./CreateAndExerciseCommandValidation";

function values() {
    return {
        create: CreateCommandValidation,
        exercise: ExerciseCommandValidation,
        createAndExercise: CreateAndExerciseCommandValidation
    };
}

export const CommandValidation = union('Command', 'commandType', values);
