// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {IdentifierValidation} from "./IdentifierValidation";
import {RecordValidation} from "./RecordValidation";
import {CreateCommand} from "../model/CreateCommand";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {object} from "./Object";

function required(): RequiredFieldsValidators<CreateCommand> {
    return {
        arguments: RecordValidation,
        templateId: IdentifierValidation
    };
}

export const CreateCommandValidation = object<CreateCommand>('CreateCommand', required, noFields);
