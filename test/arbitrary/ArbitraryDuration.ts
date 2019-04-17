// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';
import {Duration} from "../../src/model/Duration";

export const ArbitraryDuration: jsc.Arbitrary<Duration> = jsc
    .pair(jsc.number, jsc.number)
    .smap<Duration>(
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
