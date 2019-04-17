// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {LedgerOffset} from "./LedgerOffset";
import {CreatedEvent} from "./CreatedEvent";

export interface GetActiveContractsResponse {
    offset: LedgerOffset
    workflowId?: string
    activeContracts?: CreatedEvent[]
}