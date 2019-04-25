// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {union} from "./Union";
import {Validation} from "./Validation";
import {Command} from "../model/Command";
import {CreateCommandValidation} from "./CreateCommandValidation";
import {ExerciseCommandValidation} from "./ExerciseCommandValidation";

function values(): { [_ in Command['__type__']]: Validation } {
    return {
        create: CreateCommandValidation,
        exercise: ExerciseCommandValidation
    };
}

export const CommandValidation = union<Command>('Command', values);
