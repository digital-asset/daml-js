// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {CommandsValidation} from "./CommandsValidation";
import {SubmitRequest} from "../model/SubmitRequest";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {object} from "./Object";

function required(): RequiredFieldsValidators<SubmitRequest> {
    return {
        commands: CommandsValidation
    };
}

export const SubmitRequestValidation = object<SubmitRequest>('SubmitRequest', required, noFields);
