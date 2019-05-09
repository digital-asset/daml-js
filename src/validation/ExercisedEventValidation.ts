// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {IdentifierValidation} from "./IdentifierValidation";
import {ValueValidation} from "./ValueValidation";
import {ExercisedEvent} from "../model/ExercisedEvent";
import {OptionalFieldsValidators, RequiredFieldsValidators} from "./Validation";
import {array} from "./Array";
import {native} from "./Native";
import {object} from "./Object";
import {string} from "./String";

function required(): RequiredFieldsValidators<ExercisedEvent> {
    return {
        eventType: string('exercised'),
        actingParties: array(native('string')),
        choice: native('string'),
        argument: ValueValidation,
        consuming: native('boolean'),
        contractCreatingEventId: native('string'),
        contractId: native('string'),
        eventId: native('string'),
        templateId: IdentifierValidation,
        witnessParties: array(native('string'))
    };
}

function optional(): OptionalFieldsValidators<ExercisedEvent> {
    return {
        childEventIds: array(native('string')),
        exerciseResult: ValueValidation
    };
}

export const ExercisedEventValidation = object<ExercisedEvent>('ExercisedEvent', required, optional);
