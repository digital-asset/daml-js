// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {inspect} from 'util';
import {Codec} from "./Codec";
import {Event} from "../model/Event"
import {ArchivedEventCodec} from "./ArchivedEventCodec";
import {CreatedEventCodec} from "./CreatedEventCodec";
import {ExercisedEventCodec} from "./ExercisedEventCodec";

import {Event as PbEvent} from "../generated/com/digitalasset/ledger/api/v1/event_pb";

export const EventCodec: Codec<PbEvent, Event> = {
    deserialize(message: PbEvent): Event {
        if (message.hasArchived()) {
            return {
                archived: ArchivedEventCodec.deserialize(message.getArchived()!)
            }
        } else if (message.hasCreated()) {
            return {
                created: CreatedEventCodec.deserialize(message.getCreated()!)
            }
        } else if (message.hasExercised()) {
            return {
                exercised: ExercisedEventCodec.deserialize(message.getExercised()!)
            }
        } else {
            throw new Error(`Expected one of ArchivedEvent, CreatedEvent or ExercisedEvent, found ${inspect(message)}`);
        }
    },
    serialize(object: Event): PbEvent {
        const message = new PbEvent();
        if (object.archived !== undefined) {
            message.setArchived(ArchivedEventCodec.serialize(object.archived));
        } else if (object.created !== undefined) {
            message.setCreated(CreatedEventCodec.serialize(object.created));
        } else if (object.exercised !== undefined) {
            message.setExercised(ExercisedEventCodec.serialize(object.exercised));
        } else {
            throw new Error(`Expected one of ArchivedEvent, CreatedEvent or ExercisedEvent, found ${inspect(object)}`);
        }
        return message;
    }
};