// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';
import {ArchivedEvent} from "../../src/model/ArchivedEvent";
import {CreatedEvent} from "../../src/model/CreatedEvent";
import {ExercisedEvent} from "../../src/model/ExercisedEvent";
import {ArbitraryIdentifier} from "./ArbitraryIdentifier";
import {ArbitraryRecord, ArbitraryValue} from "./ArbitraryRecordValueVariant";
import {maybe} from "./Maybe";

export const ArbitraryArchivedEvent: jsc.Arbitrary<ArchivedEvent> = jsc
    .tuple([jsc.string, jsc.string, ArbitraryIdentifier, jsc.array(jsc.string)])
    .smap<ArchivedEvent>(
        ([contractId, eventId, templateId, witnessParties]) => {
            return {
                __type__: 'archived',
                contractId: contractId,
                eventId: eventId,
                templateId: templateId,
                witnessParties: witnessParties
            };
        },
        archivedEvent => {
            return [
                archivedEvent.contractId,
                archivedEvent.eventId,
                archivedEvent.templateId,
                archivedEvent.witnessParties
            ];
        }
    );

export const ArbitraryCreatedEvent: jsc.Arbitrary<CreatedEvent> = jsc
    .tuple([jsc.string, jsc.string, ArbitraryIdentifier, ArbitraryRecord, jsc.array(jsc.string)])
    .smap<CreatedEvent>(
        ([contractId, eventId, templateId, args, witnessParties]) => {
            return {
                __type__: 'created',
                contractId: contractId,
                eventId: eventId,
                templateId: templateId,
                arguments: args,
                witnessParties: witnessParties
            };
        },
        createdEvent => {
            return [
                createdEvent.contractId,
                createdEvent.eventId,
                createdEvent.templateId,
                createdEvent.arguments,
                createdEvent.witnessParties
            ];
        }
    );

export const ArbitraryExercisedEvent: jsc.Arbitrary<ExercisedEvent> = jsc
    .tuple([
        jsc.array(jsc.string),
        maybe(jsc.array(jsc.string)),
        jsc.string,
        ArbitraryValue,
        jsc.bool,
        jsc.string,
        jsc.string,
        jsc.string,
        ArbitraryIdentifier,
        jsc.array(jsc.string)
    ])
    .smap<ExercisedEvent>(
        ([
             actingParties,
             childEventIds,
             choice,
             argument,
             consuming,
             contractCreatingEventId,
             contractId,
             eventId,
             templateId,
             witnessParties
         ]) => ({
            __type__: 'exercised',
            actingParties: actingParties,
            childEventIds: childEventIds,
            choice: choice,
            argument: argument,
            consuming: consuming,
            contractCreatingEventId: contractCreatingEventId,
            contractId: contractId,
            eventId: eventId,
            templateId: templateId,
            witnessParties: witnessParties
        }),
        exercisedEvent => [
            exercisedEvent.actingParties,
            exercisedEvent.childEventIds,
            exercisedEvent.choice,
            exercisedEvent.argument,
            exercisedEvent.consuming,
            exercisedEvent.contractCreatingEventId,
            exercisedEvent.contractId,
            exercisedEvent.eventId,
            exercisedEvent.templateId,
            exercisedEvent.witnessParties
        ]
    );

export const ArbitraryEvent = jsc.oneof([ArbitraryArchivedEvent, ArbitraryCreatedEvent, ArbitraryExercisedEvent]);
export const ArbitraryTreeEvent = jsc.oneof([ArbitraryCreatedEvent, ArbitraryExercisedEvent]);
