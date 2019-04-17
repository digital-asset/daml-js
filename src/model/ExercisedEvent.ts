// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {Value} from "./Value";
import {Identifier} from "./Identifier";

export interface ExercisedEvent {
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
}