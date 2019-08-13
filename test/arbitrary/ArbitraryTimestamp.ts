// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {Timestamp} from "../../src/model/Timestamp";

export const ArbitraryTimestamp: jsc.Arbitrary<Timestamp> = jsc
    .pair(jsc.number, jsc.number)
    .smap<Timestamp>(
        ([seconds, nanoseconds]) => {
            return {
                seconds: seconds,
                nanoseconds: nanoseconds
            };
        },
        timestamp => {
            return [timestamp.seconds, timestamp.nanoseconds];
        }
    );
