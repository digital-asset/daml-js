// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {native} from "./Native";
import {object} from "./Object";
import {array} from "./Array";
import {OptionalFieldsValidators, RequiredFieldsValidators} from "./Validation";
import {CompletionStreamRequest} from "../model/CompletionStreamRequest";
import {LedgerOffsetValidation} from "./LedgerOffsetValidation";

function required(): RequiredFieldsValidators<CompletionStreamRequest> {
    return {
        applicationId: native('string'),
        parties: array(native('string')),
    };
}

function optional(): OptionalFieldsValidators<CompletionStreamRequest> {
    return {
        offset: LedgerOffsetValidation
    };
}

export const CompletionStreamRequestValidation = object<CompletionStreamRequest>('CompletionStreamRequest', required, optional);
