// Copyright (c) 2019 The DAML Authors. All rights reserved.
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
