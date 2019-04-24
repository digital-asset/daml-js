// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {native} from "./Native";
import {CreatedEvent} from "../model/CreatedEvent";
import {RecordValidation} from "./RecordValidation";
import {IdentifierValidation} from "./IdentifierValidation";
import {array} from "./Array";
import {object} from "./Object";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {string} from "./String";

function required(): RequiredFieldsValidators<CreatedEvent> {
    return {
        kind: string('created'),
        arguments: RecordValidation,
        contractId: native('string'),
        eventId: native('string'),
        templateId: IdentifierValidation,
        witnessParties: array(native('string')),
    };
}

export const CreatedEventValidation = object<CreatedEvent>('CreatedEvent', required, noFields);
