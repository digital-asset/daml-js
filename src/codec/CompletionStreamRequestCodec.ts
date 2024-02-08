// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {CompletionStreamRequest} from "../model/CompletionStreamRequest";
import {LedgerOffsetCodec} from "./LedgerOffsetCodec";

import {CompletionStreamRequest as PbCompletionStreamRequest} from "../generated/com/daml/ledger/api/v1/command_completion_service_pb";

export const CompletionStreamRequestCodec: Codec<PbCompletionStreamRequest, CompletionStreamRequest> = {
    deserialize(message: PbCompletionStreamRequest): CompletionStreamRequest {
        const object: CompletionStreamRequest = {
            applicationId: message.getApplicationId(),
            parties: message.getPartiesList()
        };
        if (message.hasOffset()) {
            object.offset = LedgerOffsetCodec.deserialize(message.getOffset()!);
        }
        return object;
    },
    serialize(object: CompletionStreamRequest): PbCompletionStreamRequest {
        const message = new PbCompletionStreamRequest();
        message.setApplicationId(object.applicationId);
        message.setPartiesList(object.parties);
        if (object.offset) {
            message.setOffset(LedgerOffsetCodec.serialize(object.offset));
        }
        return message;
    }
};