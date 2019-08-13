// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {CreatedEvent} from "../model/CreatedEvent";
import {IdentifierCodec} from "./IdentifierCodec";
import {RecordCodec} from "./RecordCodec";
import {CreatedEvent as PbCreatedEvent} from "../generated/com/digitalasset/ledger/api/v1/event_pb";
import {StringValue} from "google-protobuf/google/protobuf/wrappers_pb";

export const CreatedEventCodec: Codec<PbCreatedEvent, CreatedEvent> = {
    deserialize(message: PbCreatedEvent): CreatedEvent {
        const object: CreatedEvent = {
            eventType: "created",
            eventId: message.getEventId(),
            contractId: message.getContractId(),
            templateId: IdentifierCodec.deserialize(message.getTemplateId()!),
            arguments: RecordCodec.deserialize(message.getCreateArguments()!),
            witnessParties: message.getWitnessPartiesList()
        };
        if (message.hasAgreementText()) {
            object.agreementText = message.getAgreementText()!.getValue();
        }
        return object;
    },
    serialize(object: CreatedEvent): PbCreatedEvent {
        const message = new PbCreatedEvent();
        message.setEventId(object.eventId);
        message.setContractId(object.contractId);
        message.setTemplateId(IdentifierCodec.serialize(object.templateId));
        message.setCreateArguments(RecordCodec.serialize(object.arguments));
        message.setWitnessPartiesList(object.witnessParties);
        if (object.agreementText !== undefined) {
            const agreementText = new StringValue();
            agreementText.setValue(object.agreementText);
            message.setAgreementText(agreementText);
        }
        return message;
    }
};