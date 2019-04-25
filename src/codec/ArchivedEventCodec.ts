// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {Codec} from './Codec';
import {IdentifierCodec} from './IdentifierCodec';
import {ArchivedEvent} from '../model/ArchivedEvent';
import {ArchivedEvent as PbArchivedEvent} from '../generated/com/digitalasset/ledger/api/v1/event_pb';

export const ArchivedEventCodec: Codec<PbArchivedEvent, ArchivedEvent> = {
    deserialize(message: PbArchivedEvent): ArchivedEvent {
        return {
            __type__: 'archived',
            contractId: message.getContractId(),
            eventId: message.getEventId(),
            templateId: IdentifierCodec.deserialize(message.getTemplateId()!),
            witnessParties: message.getWitnessPartiesList()
        };
    },
    serialize(object: ArchivedEvent): PbArchivedEvent {
        const message = new PbArchivedEvent();
        message.setContractId(object.contractId);
        message.setEventId(object.eventId);
        message.setTemplateId(IdentifierCodec.serialize(object.templateId));
        message.setWitnessPartiesList(object.witnessParties);
        return message;
    }
};