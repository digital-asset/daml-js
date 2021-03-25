// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {Any} from "../../src/model/Any";

export const ArbitraryAny: jsc.Arbitrary<Any> = jsc
    .pair(jsc.string, jsc.string)
    .smap<Any>(
        ([typeUrl, value]) => {
            return {
                typeUrl: typeUrl,
                value: value
            };
        },
        any => {
            return [any.typeUrl, any.typeUrl];
        }
    );
