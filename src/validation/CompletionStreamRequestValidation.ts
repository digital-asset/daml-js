// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {native} from "./Native";
import {object} from "./Object";
import {array} from "./Array";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {CompletionStreamRequest} from "../model/CompletionStreamRequest";
import {LedgerOffsetValidation} from "./LedgerOffsetValidation";

function required(): RequiredFieldsValidators<CompletionStreamRequest> {
    return {
        applicationId: native('string'),
        offset: LedgerOffsetValidation,
        parties: array(native('string')),
    };
}

export const CompletionStreamRequestValidation = object<CompletionStreamRequest>('CompletionStreamRequest', required, noFields);
