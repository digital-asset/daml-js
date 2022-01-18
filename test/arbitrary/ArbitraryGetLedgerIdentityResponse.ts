// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {GetLedgerIdentityResponse} from "../../src/model/GetLedgerIdentityResponse";

export const ArbitraryGetLedgerIdentityResponse: jsc.Arbitrary<GetLedgerIdentityResponse> = jsc.string.smap<GetLedgerIdentityResponse>(
    ledgerId => ({
        ledgerId: ledgerId
    }),
    request => request.ledgerId
);
