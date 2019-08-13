// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {CreateAndExerciseCommand} from "../model/CreateAndExerciseCommand";

import {CreateAndExerciseCommand as PbCreateAndExerciseCommand} from "../generated/com/digitalasset/ledger/api/v1/commands_pb";
import {IdentifierCodec} from "./IdentifierCodec";
import {RecordCodec} from "./RecordCodec";
import {ValueCodec} from "./ValueCodec";

export const CreateAndExerciseCommandCodec: Codec<PbCreateAndExerciseCommand, CreateAndExerciseCommand> = {
    deserialize(message: PbCreateAndExerciseCommand): CreateAndExerciseCommand {
        return {
            commandType: "createAndExercise",
            templateId: IdentifierCodec.deserialize(message.getTemplateId()!),
            createArguments: RecordCodec.deserialize(message.getCreateArguments()!),
            choice: message.getChoice(),
            choiceArgument: ValueCodec.deserialize(message.getChoiceArgument()!)
        };
    },
    serialize(object: CreateAndExerciseCommand): PbCreateAndExerciseCommand {
        const message = new PbCreateAndExerciseCommand();
        message.setTemplateId(IdentifierCodec.serialize(object.templateId));
        message.setCreateArguments(RecordCodec.serialize(object.createArguments));
        message.setChoice(object.choice);
        message.setChoiceArgument(ValueCodec.serialize(object.choiceArgument));
        return message;
    }
};