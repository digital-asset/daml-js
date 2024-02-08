// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {TreeEvent} from "../model/TreeEvent";
import {CreatedEventCodec} from "./CreatedEventCodec";
import {ExercisedEventCodec} from "./ExercisedEventCodec";
import {TreeEvent as PbTreeEvent} from "../generated/com/daml/ledger/api/v1/transaction_pb";
import {ErrorMessages} from "../util/ErrorMessages";

export const TreeEventCodec: Codec<PbTreeEvent, TreeEvent> = {
    deserialize(message: PbTreeEvent): TreeEvent {
        if (message.hasCreated()) {
            return CreatedEventCodec.deserialize(message.getCreated()!);
        } else if (message.hasExercised()) {
            return ExercisedEventCodec.deserialize(message.getExercised()!);
        } else {
            throw new Error(ErrorMessages.unknownDeserialization('Tree Event'));
        }
    },
    serialize(object: TreeEvent): PbTreeEvent {
        const message = new PbTreeEvent();
        switch (object.eventType) {
            case 'created':
                message.setCreated(CreatedEventCodec.serialize(object));
                break;
            case 'exercised':
                message.setExercised(ExercisedEventCodec.serialize(object));
                break;
        }
        return message;
    }
};