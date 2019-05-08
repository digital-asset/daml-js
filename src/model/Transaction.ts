// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Timestamp} from "./Timestamp";
import {Event} from "./Event";

export interface Transaction {
    commandId?: string
    effectiveAt: Timestamp
    events: Event[]
    offset: string
    transactionId: string
    workflowId?: string
}