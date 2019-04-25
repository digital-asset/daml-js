// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {Timestamp} from "./Timestamp";
import {TreeEvent} from "./TreeEvent";

export interface TransactionTree {
    commandId?: string
    effectiveAt: Timestamp
    offset: string
    transactionId: string
    workflowId?: string
    eventsById: Record<string, TreeEvent>
    rootEventIds: string[]
}