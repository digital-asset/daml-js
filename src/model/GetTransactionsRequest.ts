// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {TransactionFilter} from "./TransactionFilter";
import {LedgerOffset} from "./LedgerOffset";

export interface GetTransactionsRequest {
    begin: LedgerOffset
    end?: LedgerOffset
    filter: TransactionFilter
    verbose?: boolean
}