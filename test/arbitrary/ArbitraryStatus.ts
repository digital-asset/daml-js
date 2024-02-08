// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {Status} from "../../src/model/Status";
import {ArbitraryAny} from "./ArbitraryAny";

export const ArbitraryStatus: jsc.Arbitrary<Status> = jsc
    .tuple([jsc.number, jsc.array(ArbitraryAny), jsc.string])
    .smap<Status>(
        ([code, details, message]) => ({
            code: code,
            details: details,
            message: message
        }),
        status => [status.code, status.details, status.message]
    );
