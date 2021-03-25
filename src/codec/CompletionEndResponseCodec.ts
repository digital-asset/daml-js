// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {CompletionEndResponse as PbCompletionEndResponse} from '../generated/com/daml/ledger/api/v1/command_completion_service_pb';
import {CompletionEndResponse} from "../model/CompletionEndResponse";
import {LedgerOffsetCodec} from "./LedgerOffsetCodec";

export const CompletionEndResponseCodec: Codec<PbCompletionEndResponse, CompletionEndResponse> = {
    deserialize(message: PbCompletionEndResponse): CompletionEndResponse {
        return {
            offset: LedgerOffsetCodec.deserialize(message.getOffset()!)
        };
    },
    serialize(response: CompletionEndResponse): PbCompletionEndResponse {
        const result = new PbCompletionEndResponse();
        result.setOffset(LedgerOffsetCodec.serialize(response.offset));
        return result;
    }
};