// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryLedgerOffset} from "./ArbitraryLedgerOffset";
import {CompletionEndResponse} from "../../src/model/CompletionEndResponse";

export const ArbitraryCompletionEndResponse: jsc.Arbitrary<CompletionEndResponse> = ArbitraryLedgerOffset.smap<CompletionEndResponse>(
    offset => ({
        offset: offset
    }),
    request => request.offset
);
