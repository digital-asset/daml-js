// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ExercisedEvent} from "./ExercisedEvent";
import {CreatedEvent} from "./CreatedEvent";

/**
 * Each tree event message type below contains a ``witnessParties`` field which
 * indicates the subset of the requested parties that can see the event
 * in question.
 *
 * Note that transaction trees might contain events with
 * _no_ witness parties, which were included simply because they were
 * children of events which have witnesses.
 */
export type TreeEvent = CreatedEvent | ExercisedEvent