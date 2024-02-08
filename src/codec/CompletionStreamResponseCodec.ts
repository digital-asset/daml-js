// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {CompletionStreamResponse} from "../model/CompletionStreamResponse";
import {CompletionCodec} from "./CompletionCodec";
import {CheckpointCodec} from "./CheckpointCodec";

import {CompletionStreamResponse as PbCompletionStreamResponse} from "../generated/com/daml/ledger/api/v1/command_completion_service_pb";

export const CompletionStreamResponseCodec: Codec<PbCompletionStreamResponse, CompletionStreamResponse> = {
    deserialize(message: PbCompletionStreamResponse): CompletionStreamResponse {
        const response: CompletionStreamResponse = {};
        const completions = message.getCompletionsList();
        if (completions) {
            response.completions = completions.map(c => CompletionCodec.deserialize(c));
        }
        if (message.hasCheckpoint()) {
            response.checkpoint = CheckpointCodec.deserialize(message.getCheckpoint()!)
        }
        return response;
    },
    serialize(object: CompletionStreamResponse): PbCompletionStreamResponse {
        const result = new PbCompletionStreamResponse();
        if (object.checkpoint) {
            result.setCheckpoint(CheckpointCodec.serialize(object.checkpoint));
        }
        if (object.completions) {
            result.setCompletionsList(object.completions.map((completion) => CompletionCodec.serialize(completion)));
        }
        return result;
    }
};