// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {CheckpointValidation} from "./CheckPointValidation";
import {CompletionValidation} from "./CompletionValidation";
import {CompletionStreamResponse} from "../model/CompletionStreamResponse";
import {noFields, OptionalFieldsValidators} from "./Validation";
import {array} from "./Array";
import {object} from "./Object";

function optional(): OptionalFieldsValidators<CompletionStreamResponse> {
    return {
        checkpoint: CheckpointValidation,
        completions: array(CompletionValidation),
    };
}

export const CompletionStreamResponseValidation = object<CompletionStreamResponse>('CompletionStreamResponse', noFields, optional);
