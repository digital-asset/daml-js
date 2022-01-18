// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {Command} from "../model/Command";
import {Command as PbCommand} from '../generated/com/daml/ledger/api/v1/commands_pb';
import {CreateCommandCodec} from "./CreateCommandCodec";
import {ExerciseCommandCodec} from "./ExerciseCommandCodec";
import {CreateAndExerciseCommandCodec} from "./CreateAndExerciseCommandCodec";
import {ErrorMessages} from "../util/ErrorMessages";

export const CommandCodec: Codec<PbCommand, Command> = {
    deserialize(message: PbCommand): Command {
        if (message.hasCreate()) {
            return CreateCommandCodec.deserialize(message.getCreate()!);
        } else if (message.hasExercise()) {
            return ExerciseCommandCodec.deserialize(message.getExercise()!);
        } else if (message.hasCreateandexercise()) {
            return CreateAndExerciseCommandCodec.deserialize(message.getCreateandexercise()!);
        } else {
            throw new Error(ErrorMessages.unknownDeserialization('Command'));
        }
    },
    serialize(object: Command): PbCommand {
        const message = new PbCommand();
        switch (object.commandType) {
            case "exercise":
                message.setExercise(ExerciseCommandCodec.serialize(object));
                break;
            case "create":
                message.setCreate(CreateCommandCodec.serialize(object));
                break;
            case "createAndExercise":
                message.setCreateandexercise(CreateAndExerciseCommandCodec.serialize(object));
        }
        return message;
    }
};