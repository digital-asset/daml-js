// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryFilters} from './ArbitraryFilters';
import {TransactionFilter} from "../../src/model/TransactionFilter";

export const ArbitraryTransactionFilter: jsc.Arbitrary<TransactionFilter> = jsc.dict(ArbitraryFilters).smap(
    filtersByParty => {
        return {
            filtersByParty: filtersByParty
        };
    },
    transactionFilter => transactionFilter.filtersByParty
);
