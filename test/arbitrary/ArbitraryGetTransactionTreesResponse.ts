// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';
import {GetTransactionTreesResponse} from "../../src/model/GetTransactionTreesResponse";
import {ArbitraryTransactionTree} from "./ArbitraryTransactionTree";

export const ArbitraryGetTransactionTreesResponse: jsc.Arbitrary<GetTransactionTreesResponse> = jsc.array(ArbitraryTransactionTree).smap<GetTransactionTreesResponse>(
    transactions => ({
        transactions: transactions
    }),
    request => request.transactions
);
