// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {CreatedEvent} from "../model/CreatedEvent";
import {IdentifierCodec} from "./IdentifierCodec";
import {RecordCodec} from "./RecordCodec";
import {ValueCodec} from "./ValueCodec";
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
            witnessParties: message.getWitnessPartiesList(),
            signatories: message.getSignatoriesList(),
            observers: message.getObserversList()
        };
        if (message.hasAgreementText()) {
            object.agreementText = message.getAgreementText()!.getValue();
        }
        if (message.hasContractKey()) {
            object.contractKey = ValueCodec.deserialize(message.getContractKey()!);
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
        for (const signatory of object.signatories) {
            message.addSignatories(signatory);
        }
        for (const observer of object.observers) {
            message.addObservers(observer);
        }
        if (object.agreementText !== undefined) {
            const agreementText = new StringValue();
            agreementText.setValue(object.agreementText);
            message.setAgreementText(agreementText);
        }
        if (object.contractKey !== undefined) {
            message.setContractKey(ValueCodec.serialize(object.contractKey));
        }
        return message;
    }
};