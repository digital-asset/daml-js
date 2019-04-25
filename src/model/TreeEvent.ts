// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {ExercisedEvent} from "./ExercisedEvent";
import {CreatedEvent} from "./CreatedEvent";

export interface TreeEvent {
    created?: CreatedEvent,
    exercised?: ExercisedEvent
}