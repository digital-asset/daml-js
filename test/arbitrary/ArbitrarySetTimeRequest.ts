// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {SetTimeRequest} from "../../src/model/SetTimeRequest";
import {ArbitraryTimestamp} from "./ArbitraryTimestamp";

export const ArbitrarySetTimeRequest: jsc.Arbitrary<SetTimeRequest> = jsc
    .tuple([ArbitraryTimestamp, ArbitraryTimestamp])
    .smap<SetTimeRequest>(
        ([currentTime, newTime]) => ({
            currentTime: currentTime,
            newTime: newTime
        }),
        request => [request.currentTime, request.newTime]
    );
