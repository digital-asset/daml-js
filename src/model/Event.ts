// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {CreatedEvent} from "./CreatedEvent";
import {ArchivedEvent} from "./ArchivedEvent";

/**
 * An event in the flat transaction stream can either be the creation
 * or the archiving of a contract.
 *
 * In the transaction service the events are restricted to the events
 * visible for the parties specified in the transaction filter. Each
 * event message type below contains a ``witnessParties`` field which
 * indicates the subset of the requested parties that can see the event
 * in question. In the flat transaction stream you'll only receive
 * events that have witnesses.
 *
 * Uses the `eventType` string type tag to differentiate between types in the union.
 */
export type Event = ArchivedEvent | CreatedEvent;