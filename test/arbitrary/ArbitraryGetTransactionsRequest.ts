// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryLedgerOffset} from "./ArbitraryLedgerOffset";
import {maybe} from "./Maybe";
import {ArbitraryTransactionFilter} from "./ArbitraryTransactionFilter";
import {GetTransactionsRequest} from "../../src/model/GetTransactionsRequest";

export const ArbitraryGetTransactionsRequest: jsc.Arbitrary<GetTransactionsRequest> = jsc
    .tuple([
        ArbitraryLedgerOffset,
        maybe(ArbitraryLedgerOffset),
        ArbitraryTransactionFilter,
        maybe(jsc.bool)
    ])
    .smap(
        ([begin, end, filter, verbose]) => {
            const request: GetTransactionsRequest = {
                begin: begin,
                filter: filter
            };
            if (end) {
                request.end = end;
            }
            if (verbose !== undefined) {
                request.verbose = verbose;
            }
            return request;
        },
        request => {
            return [request.begin, request.end, request.filter, request.verbose];
        }
    );
