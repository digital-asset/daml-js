// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {Codec} from "./Codec";
import {CreatedEvent} from "../model/CreatedEvent";
import {IdentifierCodec} from "./IdentifierCodec";
import {RecordCodec} from "./RecordCodec";

import {CreatedEvent as PbCreatedEvent} from "../generated/com/digitalasset/ledger/api/v1/event_pb";

export const CreatedEventCodec: Codec<PbCreatedEvent, CreatedEvent> = {
    deserialize(event: PbCreatedEvent): CreatedEvent {
        return {
            __type__: "created",
            eventId: event.getEventId(),
            contractId: event.getContractId(),
            templateId: IdentifierCodec.deserialize(event.getTemplateId()!),
            arguments: RecordCodec.deserialize(event.getCreateArguments()!),
            witnessParties: event.getWitnessPartiesList()
        };
    },
    serialize(event: CreatedEvent): PbCreatedEvent {
        const result = new PbCreatedEvent();
        result.setEventId(event.eventId);
        result.setContractId(event.contractId);
        result.setTemplateId(IdentifierCodec.serialize(event.templateId));
        result.setCreateArguments(RecordCodec.serialize(event.arguments));
        result.setWitnessPartiesList(event.witnessParties);
        return result;
    }
};