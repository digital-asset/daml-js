// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {Validation} from "./Validation";
import {ArchivedEventValidation} from "./ArchivedEventValidation";
import {CreatedEventValidation} from "./CreatedEventValidation";
import {ExercisedEventValidation} from "./ExercisedEventValidation";
import {Event} from "../model/Event";
import {union} from "./Union";

function values(): { [_ in Event['__type__']]: Validation } {
    return {
        archived: ArchivedEventValidation,
        created: CreatedEventValidation,
        exercised: ExercisedEventValidation
    };
}

export const EventValidation = union<Event>('Event', values);