// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Value} from "./Value";
import {Identifier} from "./Identifier";

export interface ExercisedEvent {
    eventType: 'exercised'
    actingParties: string[]
    childEventIds?: string[]
    choice: string
    argument: Value
    consuming: boolean
    contractCreatingEventId: string
    contractId: string
    eventId: string
    templateId: Identifier
    witnessParties: string[]
    /**
     * Optional to ensure backward compatibility with ledgers before 0.12.16
     */
    exerciseResult?: Value
}