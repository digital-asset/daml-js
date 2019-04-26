// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {CreatedEventValidation} from "./CreatedEventValidation";
import {ExercisedEventValidation} from "./ExercisedEventValidation";
import {union} from "./Union";

function values() {
    return {
        created: CreatedEventValidation,
        exercised: ExercisedEventValidation
    };
}

export const TreeEventValidation = union('TreeEvent', 'eventType', values);