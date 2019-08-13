// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {Event} from "../model/Event"
import {ArchivedEventCodec} from "./ArchivedEventCodec";
import {CreatedEventCodec} from "./CreatedEventCodec";
import {Event as PbEvent} from "../generated/com/digitalasset/ledger/api/v1/event_pb";
import {ErrorMessages} from "../util/ErrorMessages";

export const EventCodec: Codec<PbEvent, Event> = {
    deserialize(message: PbEvent): Event {
        if (message.hasArchived()) {
            return ArchivedEventCodec.deserialize(message.getArchived()!);
        } else if (message.hasCreated()) {
            return CreatedEventCodec.deserialize(message.getCreated()!);
        } else {
            throw new Error(ErrorMessages.unknownDeserialization('Event'));
        }
    },
    serialize(object: Event): PbEvent {
        const message = new PbEvent();
        switch (object.eventType) {
            case "archived":
                message.setArchived(ArchivedEventCodec.serialize(object));
                break;
            case "created":
                message.setCreated(CreatedEventCodec.serialize(object));
                break;
        }
        return message;
    }
};