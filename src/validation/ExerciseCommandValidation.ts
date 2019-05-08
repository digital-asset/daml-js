// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {IdentifierValidation} from "./IdentifierValidation";
import {ValueValidation} from "./ValueValidation";
import {ExerciseCommand} from "../model/ExerciseCommand";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {native} from "./Native";
import {object} from "./Object";
import {string} from "./String";

function required(): RequiredFieldsValidators<ExerciseCommand> {
    return {
        commandType: string('exercise'),
        argument: ValueValidation,
        choice: native('string'),
        contractId: native('string'),
        templateId: IdentifierValidation
    };
}

export const ExerciseCommandValidation = object<ExerciseCommand>('ExerciseCommand', required, noFields);
