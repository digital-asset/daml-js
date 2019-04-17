// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';
import {GetLedgerEndResponse} from "../../src/model/GetLedgerEndResponse";
import {ArbitraryLedgerOffset} from "./ArbitraryLedgerOffset";

export const ArbitraryGetLedgerEndResponse: jsc.Arbitrary<GetLedgerEndResponse> = ArbitraryLedgerOffset.smap<GetLedgerEndResponse>(
    offset => ({
        offset: offset
    }),
    request => request.offset
);
