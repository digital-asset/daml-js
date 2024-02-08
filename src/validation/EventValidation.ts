// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ArchivedEventValidation} from "./ArchivedEventValidation";
import {CreatedEventValidation} from "./CreatedEventValidation";
import {union} from "./Union";

function values() {
    return {
        archived: ArchivedEventValidation,
        created: CreatedEventValidation
    };
}

export const EventValidation = union('Event', 'eventType', values);