// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {Codec} from "./Codec";
import {Command} from "../model/Command";
import {Command as PbCommand} from '../generated/com/digitalasset/ledger/api/v1/commands_pb';
import {CreateCommandCodec} from "./CreateCommandCodec";
import {ExerciseCommandCodec} from "./ExerciseCommandCodec";

export const CommandCodec: Codec<PbCommand, Command> = {
    deserialize(message: PbCommand): Command {
        if (message.hasCreate()) {
            return CreateCommandCodec.deserialize(message.getCreate()!);
        } else if (message.hasExercise()) {
            return ExerciseCommandCodec.deserialize(message.getExercise()!);
        } else {
            throw new Error('Deserialization error, unable to discriminate value type - this is likely to be a bug');
        }
    },
    serialize(object: Command): PbCommand {
        const message = new PbCommand();
        switch (object.__type__) {
            case "exercise":
                message.setExercise(ExerciseCommandCodec.serialize(object));
                break;
            case "create":
                message.setCreate(CreateCommandCodec.serialize(object));
                break;
        }
        return message;
    }
};