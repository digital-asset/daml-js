// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {native} from "./Native";
import {object} from "./Object";
import {array} from "./Array";
import {OptionalFieldsValidators, RequiredFieldsValidators} from "./Validation";
import {Commands} from "../model/Commands";
import {CommandValidation} from "./CommandValidation";

function required(): RequiredFieldsValidators<Commands> {
    return {
        applicationId: native('string'),
        commandId: native('string'),
        list: array(CommandValidation),
        party: native('string')
    };
}

function optional(): OptionalFieldsValidators<Commands> {
    return {
        workflowId: native('string')
    };
}

export const CommandsValidation = object<Commands>('Commands', required, optional);
