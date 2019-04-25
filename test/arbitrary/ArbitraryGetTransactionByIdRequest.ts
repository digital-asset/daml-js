// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';
import {GetTransactionByIdRequest} from "../../src/model/GetTransactionByIdRequest";

export const ArbitraryGetTransactionByIdRequest: jsc.Arbitrary<GetTransactionByIdRequest> = jsc.tuple([jsc.string, jsc.array(jsc.string)]).smap(
    ([transactionId, requestingParties]) => ({
        transactionId: transactionId,
        requestingParties: requestingParties
    }),
    request => [request.transactionId, request.requestingParties]
);
