// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {IdentifierValidation} from "./IdentifierValidation";
import {ValueValidation} from "./ValueValidation";
import {ExerciseCommand} from "../model/ExerciseCommand";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {native} from "./Native";
import {object} from "./Object";

function required(): RequiredFieldsValidators<ExerciseCommand> {
    return {
        argument: ValueValidation,
        choice: native('string'),
        contractId: native('string'),
        templateId: IdentifierValidation
    };
}

export const ExerciseCommandValidation = object<ExerciseCommand>('ExerciseCommand', required, noFields);
