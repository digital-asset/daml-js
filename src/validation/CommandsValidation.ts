// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {native} from "./Native";
import {object} from "./Object";
import {array} from "./Array";
import {OptionalFieldsValidators, RequiredFieldsValidators} from "./Validation";
import {Commands} from "../model/Commands";
import {TimestampValidation} from "./TimestampValidation";
import {CommandValidation} from "./CommandValidation";

function required(): RequiredFieldsValidators<Commands> {
    return {
        applicationId: native('string'),
        commandId: native('string'),
        ledgerEffectiveTime: TimestampValidation,
        list: array(CommandValidation),
        maximumRecordTime: TimestampValidation,
        party: native('string')
    };
}

function optional(): OptionalFieldsValidators<Commands> {
    return {
        workflowId: native('string')
    };
}

export const CommandsValidation = object<Commands>('Commands', required, optional);
