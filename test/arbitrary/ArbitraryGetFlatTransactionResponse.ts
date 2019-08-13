// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryTransaction} from './ArbitraryTransaction';
import {GetFlatTransactionResponse} from "../../src/model/GetFlatTransactionResponse";

export const ArbitraryGetFlatTransactionResponse: jsc.Arbitrary<GetFlatTransactionResponse> =
    jsc.record({
        transaction: ArbitraryTransaction
    });
