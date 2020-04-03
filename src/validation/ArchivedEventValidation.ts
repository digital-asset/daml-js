// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {native} from "./Native";
import {object} from "./Object";
import {array} from "./Array";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {ArchivedEvent} from "../model/ArchivedEvent";
import {IdentifierValidation} from "./IdentifierValidation";
import {string} from "./String";

function required(): RequiredFieldsValidators<ArchivedEvent> {
    return {
        eventType: string('archived'),
        contractId: native('string'),
        eventId: native('string'),
        templateId: IdentifierValidation,
        witnessParties: array(native('string'))
    };
}

export const ArchivedEventValidation = object<ArchivedEvent>('ArchivedEvent', required, noFields);
