// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {CommandsValidation} from "./CommandsValidation";
import {SubmitAndWaitRequest} from "../model/SubmitAndWaitRequest";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {object} from "./Object";

function required(): RequiredFieldsValidators<SubmitAndWaitRequest> {
    return {
        commands: CommandsValidation
    };
}

export const SubmitAndWaitRequestValidation = object<SubmitAndWaitRequest>('SubmitAndWaitRequest', required, noFields);
