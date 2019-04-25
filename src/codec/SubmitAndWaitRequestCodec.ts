// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {Codec} from "./Codec";
import {SubmitAndWaitRequest} from "../model/SubmitAndWaitRequest";
import {CommandsCodec} from "./CommandsCodec";
import {SubmitAndWaitRequest as PbSubmitAndWaitRequest} from "../generated/com/digitalasset/ledger/api/v1/command_service_pb";

export const SubmitAndWaitRequestCodec: Codec<PbSubmitAndWaitRequest, SubmitAndWaitRequest> = {
    deserialize(request: PbSubmitAndWaitRequest): SubmitAndWaitRequest {
        return {
            commands: CommandsCodec.deserialize(request.getCommands()!)
        };
    },
    serialize(request: SubmitAndWaitRequest): PbSubmitAndWaitRequest {
        const result = new PbSubmitAndWaitRequest();
        result.setCommands(CommandsCodec.serialize(request.commands));
        return result;
    }
};