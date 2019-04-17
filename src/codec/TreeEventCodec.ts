// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {Codec} from "./Codec";
import {TreeEvent} from "../model/TreeEvent";
import {CreatedEventCodec} from "./CreatedEventCodec";
import {ExercisedEventCodec} from "./ExercisedEventCodec";
import {TreeEvent as PbTreeEvent} from "../generated/com/digitalasset/ledger/api/v1/transaction_pb";

export const TreeEventCodec: Codec<PbTreeEvent, TreeEvent> = {
    deserialize(message: PbTreeEvent): TreeEvent {
        const object: TreeEvent = {};
        if (message.hasCreated()) {
            object.created = CreatedEventCodec.deserialize(message.getCreated()!);
        }
        if (message.hasExercised()) {
            object.exercised = ExercisedEventCodec.deserialize(message.getExercised()!);
        }
        return object;
    },
    serialize(object: TreeEvent): PbTreeEvent {
        const message = new PbTreeEvent();
        if (object.created) {
            message.setCreated(CreatedEventCodec.serialize(object.created));
        }
        if (object.exercised) {
            message.setExercised(ExercisedEventCodec.serialize(object.exercised));
        }
        return message;
    }
};