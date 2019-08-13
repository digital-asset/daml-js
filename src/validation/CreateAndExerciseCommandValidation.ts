// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {IdentifierValidation} from "./IdentifierValidation";
import {RecordValidation} from "./RecordValidation";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {object} from "./Object";
import {string} from "./String";
import {CreateAndExerciseCommand} from "../model/CreateAndExerciseCommand";
import {ValueValidation} from "./ValueValidation";
import {native} from "./Native";

function required(): RequiredFieldsValidators<CreateAndExerciseCommand> {
    return {
        commandType: string('createAndExercise'),
        templateId: IdentifierValidation,
        createArguments: RecordValidation,
        choice: native('string'),
        choiceArgument: ValueValidation
    };
}

export const CreateAndExerciseCommandValidation = object<CreateAndExerciseCommand>('CreateAndExerciseCommand', required, noFields);
