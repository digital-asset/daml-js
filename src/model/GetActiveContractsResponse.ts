// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {CreatedEvent} from "./CreatedEvent";

export interface GetActiveContractsResponse {
    offset: string
    workflowId?: string
    activeContracts?: CreatedEvent[]
}