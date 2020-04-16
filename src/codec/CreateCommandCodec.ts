// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {CreateCommand} from "../model/CreateCommand";
import {IdentifierCodec} from "./IdentifierCodec";
import {RecordCodec} from "./RecordCodec";

import {CreateCommand as PbCreateCommand} from "../generated/com/daml/ledger/api/v1/commands_pb";

export const CreateCommandCodec: Codec<PbCreateCommand, CreateCommand> = {
    deserialize(command: PbCreateCommand): CreateCommand {
        return {
            commandType: "create",
            templateId: IdentifierCodec.deserialize(command.getTemplateId()!),
            arguments: RecordCodec.deserialize(command.getCreateArguments()!)
        }
    },
    serialize(command: CreateCommand): PbCreateCommand {
        const result = new PbCreateCommand();
        result.setTemplateId(IdentifierCodec.serialize(command.templateId));
        result.setCreateArguments(RecordCodec.serialize(command.arguments));
        return result;
    }
};