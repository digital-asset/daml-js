// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {GetTransactionByEventIdRequest} from "../../src/model/GetTransactionByEventIdRequest";

export const ArbitraryGetTransactionByEventIdRequest: jsc.Arbitrary<GetTransactionByEventIdRequest> = jsc.tuple([jsc.string, jsc.array(jsc.string)]).smap(
    ([eventId, requestingParties]) => ({
        eventId: eventId,
        requestingParties: requestingParties
    }),
    request => [request.eventId, request.requestingParties]
);
