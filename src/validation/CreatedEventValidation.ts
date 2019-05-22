// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {native} from "./Native";
import {CreatedEvent} from "../model/CreatedEvent";
import {RecordValidation} from "./RecordValidation";
import {IdentifierValidation} from "./IdentifierValidation";
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
    };
}

function optional(): OptionalFieldsValidators<CreatedEvent> {
    return {
        agreementText: native('string')
    };
}

export const CreatedEventValidation = object<CreatedEvent>('CreatedEvent', required, optional);
