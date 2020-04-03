// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {ExercisedEvent} from "../model/ExercisedEvent";
import {ValueCodec} from "./ValueCodec";
import {IdentifierCodec} from "./IdentifierCodec";

import {ExercisedEvent as PbExercisedEvent} from "../generated/com/digitalasset/ledger/api/v1/event_pb";

export const ExercisedEventCodec: Codec<PbExercisedEvent, ExercisedEvent> = {
    deserialize(message: PbExercisedEvent): ExercisedEvent {
        const event: ExercisedEvent = {
            eventType: "exercised",
            actingParties: message.getActingPartiesList(),
            choice: message.getChoice(),
            argument: ValueCodec.deserialize(message.getChoiceArgument()!),
            consuming: message.getConsuming(),
            contractId: message.getContractId(),
            eventId: message.getEventId(),
            templateId: IdentifierCodec.deserialize(message.getTemplateId()!),
            witnessParties: message.getWitnessPartiesList()
        };
        const childEventIds = message.getChildEventIdsList();
        if (childEventIds.length > 0) {
            event.childEventIds = [...childEventIds];
        }
        const exerciseResult = message.getExerciseResult();
        if (exerciseResult) {
            event.exerciseResult = ValueCodec.deserialize(exerciseResult);
        }
        return event;
    },
    serialize(object: ExercisedEvent): PbExercisedEvent {
        const message = new PbExercisedEvent();
        message.setActingPartiesList(object.actingParties);
        message.setChoice(object.choice);
        message.setChoiceArgument(ValueCodec.serialize(object.argument));
        message.setConsuming(object.consuming);
        message.setContractId(object.contractId);
        message.setEventId(object.eventId);
        message.setTemplateId(IdentifierCodec.serialize(object.templateId));
        message.setWitnessPartiesList(object.witnessParties)
        if (object.childEventIds) {
            message.setChildEventIdsList([...object.childEventIds]);
        }
        if (object.exerciseResult) {
            message.setExerciseResult(ValueCodec.serialize(object.exerciseResult));
        }
        return message;
    }
};