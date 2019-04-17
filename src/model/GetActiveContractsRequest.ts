// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {TransactionFilter} from "./TransactionFilter";

export interface GetActiveContractsRequest {
    filter: TransactionFilter
    verbose?: boolean
}