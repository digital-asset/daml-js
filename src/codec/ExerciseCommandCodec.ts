// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {Codec} from "./Codec";
import {ExerciseCommand} from "../model/ExerciseCommand";
import {IdentifierCodec} from "./IdentifierCodec";
import {ValueCodec} from "./ValueCodec";

import {ExerciseCommand as PbExerciseCommand} from "../generated/com/digitalasset/ledger/api/v1/commands_pb";

export const ExerciseCommandCodec: Codec<PbExerciseCommand, ExerciseCommand> = {
    deserialize(command: PbExerciseCommand): ExerciseCommand {
        return {
            commandType: "exercise",
            templateId: IdentifierCodec.deserialize(command.getTemplateId()!),
            contractId: command.getContractId(),
            choice: command.getChoice(),
            argument: ValueCodec.deserialize(command.getChoiceArgument()!),
        };
    },
    serialize(command: ExerciseCommand): PbExerciseCommand {
        const result = new PbExerciseCommand();
        result.setTemplateId(IdentifierCodec.serialize(command.templateId));
        result.setContractId(command.contractId);
        result.setChoice(command.choice);
        result.setChoiceArgument(ValueCodec.serialize(command.argument));
        return result;
    }
};