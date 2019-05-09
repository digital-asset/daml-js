// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryTransaction} from './ArbitraryTransaction';
import {GetFlatTransactionResponse} from "../../src/model/GetFlatTransactionResponse";

export const ArbitraryGetFlatTransactionResponse: jsc.Arbitrary<GetFlatTransactionResponse> = ArbitraryTransaction.smap<GetFlatTransactionResponse>(
    transaction => ({
        transaction: transaction
    }),
    request => request.transaction
);
