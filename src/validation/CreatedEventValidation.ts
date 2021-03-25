// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {native} from "./Native";
import {CreatedEvent} from "../model/CreatedEvent";
import {RecordValidation} from "./RecordValidation";
import {IdentifierValidation} from "./IdentifierValidation";
import {ValueValidation} from "./ValueValidation";
import {array} from "./Array";
import {object} from "./Object";
import {OptionalFieldsValidators, RequiredFieldsValidators} from "./Validation";
import {string} from "./String";

function required(): RequiredFieldsValidators<CreatedEvent> {
    return {
        eventType: string('created'),
        arguments: RecordValidation,
        contractId: native('string'),
        eventId: native('string'),
        templateId: IdentifierValidation,
        witnessParties: array(native('string')),
        signatories: array(native('string')),
        observers: array(native('string'))
    };
}

function optional(): OptionalFieldsValidators<CreatedEvent> {
    return {
        agreementText: native('string'),
        contractKey: ValueValidation,
    };
}

export const CreatedEventValidation = object<CreatedEvent>('CreatedEvent', required, optional);
