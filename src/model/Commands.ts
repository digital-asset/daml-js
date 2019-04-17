// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {Timestamp} from "./Timestamp";
import {Command} from "./Command";

export interface Commands {
    applicationId: string
    commandId: string
    party: string
    workflowId?: string
    ledgerEffectiveTime: Timestamp
    maximumRecordTime: Timestamp
    list: Command[]
}