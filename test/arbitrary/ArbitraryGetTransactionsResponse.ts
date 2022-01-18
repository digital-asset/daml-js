// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryTransaction} from './ArbitraryTransaction';
import {GetTransactionsResponse} from "../../src/model/GetTransactionsResponse";

export const ArbitraryGetTransactionsResponse: jsc.Arbitrary<GetTransactionsResponse> = jsc.array(ArbitraryTransaction).smap<GetTransactionsResponse>(
    transactions => ({
        transactions: transactions
    }),
    request => request.transactions
);
