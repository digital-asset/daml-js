// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryTimestamp} from './ArbitraryTimestamp';
import {GetTimeResponse} from "../../src/model/GetTimeResponse";

export const ArbitraryGetTimeResponse: jsc.Arbitrary<GetTimeResponse> = ArbitraryTimestamp.smap<GetTimeResponse>(
    currentTime => ({
        currentTime: currentTime
    }),
    request => request.currentTime
);
