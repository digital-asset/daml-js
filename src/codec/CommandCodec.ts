// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {inspect} from 'util';
import {Codec} from "./Codec";
import {Command} from "../model/Command";
import {Command as PbCommand} from '../generated/com/digitalasset/ledger/api/v1/commands_pb';
import {CreateCommandCodec} from "./CreateCommandCodec";
import {ExerciseCommandCodec} from "./ExerciseCommandCodec";

export const CommandCodec: Codec<PbCommand, Command> = {
    deserialize(command: PbCommand): Command {
        if (command.hasCreate()) {
            return {create: CreateCommandCodec.deserialize(command.getCreate()!)};
        } else if (command.hasExercise()) {
            return {exercise: ExerciseCommandCodec.deserialize(command.getExercise()!)};
        } else {
            throw new Error(`Expected either CreateCommand or ExerciseCommand, found ${inspect(command)}`);
        }
    },
    serialize(command: Command): PbCommand {
        const result = new PbCommand();
        if (command.create !== undefined) {
            result.setCreate(CreateCommandCodec.serialize(command.create));
        } else if (command.exercise !== undefined) {
            result.setExercise(ExerciseCommandCodec.serialize(command.exercise));
        } else {
            throw new Error(`Expected either LedgerOffset Absolute or LedgerOffset Boundary, found ${inspect(command)}`);
        }
        return result;
    }
};