// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryTransaction} from './ArbitraryTransaction';
import {SubmitAndWaitForTransactionResponse} from "../../src/model/SubmitAndWaitForTransactionResponse";

export const ArbitrarySubmitAndWaitForTransactionResponse: jsc.Arbitrary<SubmitAndWaitForTransactionResponse> =
    jsc.record({
        transaction: ArbitraryTransaction
    });
