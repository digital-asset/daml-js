// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {OptionalFieldsValidators, RequiredFieldsValidators} from "./Validation";
import {Completion} from "../model/Completion";
import {native} from "./Native";
import {StatusValidation} from "./StatusValidation";
import {object} from "./Object";

function required(): RequiredFieldsValidators<Completion> {
    return {
        commandId: native('string'),
    };
}

function optional(): OptionalFieldsValidators<Completion> {
    return {
        status: StatusValidation,
        transactionId: native('string')
    };
}

export const CompletionValidation = object<Completion>('Completion', required, optional);
