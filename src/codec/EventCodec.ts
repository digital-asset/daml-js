// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {Codec} from "./Codec";
import {Event} from "../model/Event"
import {ArchivedEventCodec} from "./ArchivedEventCodec";
import {CreatedEventCodec} from "./CreatedEventCodec";
import {ExercisedEventCodec} from "./ExercisedEventCodec";

import {Event as PbEvent} from "../generated/com/digitalasset/ledger/api/v1/event_pb";

export const EventCodec: Codec<PbEvent, Event> = {
    deserialize(message: PbEvent): Event {
        if (message.hasArchived()) {
            return ArchivedEventCodec.deserialize(message.getArchived()!);
        } else if (message.hasCreated()) {
            return CreatedEventCodec.deserialize(message.getCreated()!);
        } else if (message.hasExercised()) {
            return ExercisedEventCodec.deserialize(message.getExercised()!);
        } else {
            throw new Error('Deserialization error, unable to discriminate value type - this is likely to be a bug');
        }
    },
    serialize(object: Event): PbEvent {
        const message = new PbEvent();
        switch (object.kind) {
            case "archived":
                message.setArchived(ArchivedEventCodec.serialize(object));
                break;
            case "created":
                message.setCreated(CreatedEventCodec.serialize(object));
                break;
            case "exercised":
                message.setExercised(ExercisedEventCodec.serialize(object));
                break;
        }
        return message;
    }
};