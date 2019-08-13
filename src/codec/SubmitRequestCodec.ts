// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {SubmitRequest} from "../model/SubmitRequest";
import {CommandsCodec} from "./CommandsCodec";
import {SubmitRequest as PbSubmitRequest} from "../generated/com/digitalasset/ledger/api/v1/command_submission_service_pb";

export const SubmitRequestCodec: Codec<PbSubmitRequest, SubmitRequest> = {
    deserialize(request: PbSubmitRequest): SubmitRequest {
        return {
            commands: CommandsCodec.deserialize(request.getCommands()!)
        };
    },
    serialize(request: SubmitRequest): PbSubmitRequest {
        const result = new PbSubmitRequest();
        result.setCommands(CommandsCodec.serialize(request.commands));
        return result;
    }
};