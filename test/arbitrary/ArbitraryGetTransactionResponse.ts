// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryTransactionTree} from './ArbitraryTransactionTree';
import {GetTransactionResponse} from "../../src/model/GetTransactionResponse";

export const ArbitraryGetTransactionResponse: jsc.Arbitrary<GetTransactionResponse> = ArbitraryTransactionTree.smap<GetTransactionResponse>(
    transaction => ({
        transaction: transaction
    }),
    request => request.transaction
);
