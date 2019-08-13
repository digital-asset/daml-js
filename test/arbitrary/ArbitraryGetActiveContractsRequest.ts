// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {GetActiveContractsRequest} from "../../src/model/GetActiveContractsRequest";
import {maybe} from "./Maybe";
import {ArbitraryTransactionFilter} from "./ArbitraryTransactionFilter";

export const ArbitraryGetActiveContractsRequest: jsc.Arbitrary<GetActiveContractsRequest> = jsc.tuple([ArbitraryTransactionFilter, maybe(jsc.bool)]).smap(
    ([filter, verbose]) => {
        const request: GetActiveContractsRequest = {
            filter: filter
        };
        if (verbose) {
            request.verbose = verbose;
        }
        return request;
    },
    request => {
        return [request.filter, request.verbose];
    }
);
