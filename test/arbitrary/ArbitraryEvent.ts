// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {ArchivedEvent} from "../../src/model/ArchivedEvent";
import {CreatedEvent} from "../../src/model/CreatedEvent";
import {ExercisedEvent} from "../../src/model/ExercisedEvent";
import {ArbitraryIdentifier} from "./ArbitraryIdentifier";
import {ArbitraryRecord, ArbitraryValue} from "./ArbitraryRecordValueVariant";
import {maybe} from "./Maybe";

export const ArbitraryArchivedEvent: jsc.Arbitrary<ArchivedEvent> =
    jsc.record<ArchivedEvent>({
        eventType: jsc.constant('archived'),
        contractId: jsc.string,
        eventId: jsc.string,
        templateId: ArbitraryIdentifier,
        witnessParties: jsc.array(jsc.string)
    });


export const ArbitraryCreatedEvent: jsc.Arbitrary<CreatedEvent> =
    jsc.record<CreatedEvent>({
        eventType: jsc.constant('created'),
        contractId: jsc.string,
        eventId: jsc.string,
        templateId: ArbitraryIdentifier,
        arguments: ArbitraryRecord,
        witnessParties: jsc.array(jsc.string),
        agreementText: maybe(jsc.string),
        contractKey: maybe(ArbitraryValue),
        signatories: jsc.array(jsc.string),
        observers: jsc.array(jsc.string)
    });

export const ArbitraryExercisedEvent: jsc.Arbitrary<ExercisedEvent> =
    jsc.record<ExercisedEvent>({
        eventType: jsc.constant('exercised'),
        actingParties: jsc.array(jsc.string),
        childEventIds: maybe(jsc.array(jsc.string)),
        choice: jsc.string,
        argument: ArbitraryValue,
        consuming: jsc.bool,
        contractId: jsc.string,
        eventId: jsc.string,
        templateId: ArbitraryIdentifier,
        witnessParties: jsc.array(jsc.string),
        exerciseResult: maybe(ArbitraryValue)
    });

export const ArbitraryEvent = jsc.oneof([ArbitraryArchivedEvent, ArbitraryCreatedEvent]);
export const ArbitraryTreeEvent = jsc.oneof([ArbitraryCreatedEvent, ArbitraryExercisedEvent]);
