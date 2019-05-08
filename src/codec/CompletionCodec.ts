// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {Completion} from "../model/Completion";
import {Completion as PbCompletion} from "../generated/com/digitalasset/ledger/api/v1/completion_pb";
import {StatusCodec} from "./StatusCodec";

export const CompletionCodec: Codec<PbCompletion, Completion> = {
    deserialize(message: PbCompletion): Completion {
        const completion: Completion = {
            commandId: message.getCommandId()
        };
        const status = message.getStatus();
        if (status !== undefined) {
            completion.status = StatusCodec.deserialize(status);
        }
        return completion;
    },
    serialize(object: Completion): PbCompletion {
        const message = new PbCompletion();
        message.setCommandId(object.commandId);
        if (object.status) {
            message.setStatus(StatusCodec.serialize(object.status));
        }
        return message;
    }
};