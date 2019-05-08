// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {CompletionStreamRequest} from "../model/CompletionStreamRequest";
import {LedgerOffsetCodec} from "./LedgerOffsetCodec";

import {CompletionStreamRequest as PbCompletionStreamRequest} from "../generated/com/digitalasset/ledger/api/v1/command_completion_service_pb";

export const CompletionStreamRequestCodec: Codec<PbCompletionStreamRequest, CompletionStreamRequest> = {
    deserialize(message: PbCompletionStreamRequest): CompletionStreamRequest {
        return {
            applicationId: message.getApplicationId(),
            offset: LedgerOffsetCodec.deserialize(message.getOffset()!),
            parties: message.getPartiesList()
        };
    },
    serialize(object: CompletionStreamRequest): PbCompletionStreamRequest {
        const result = new PbCompletionStreamRequest();
        result.setApplicationId(object.applicationId);
        result.setOffset(LedgerOffsetCodec.serialize(object.offset));
        result.setPartiesList(object.parties);
        return result;
    }
};