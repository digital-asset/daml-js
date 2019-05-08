// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryDuration} from './ArbitraryDuration';
import {LedgerConfiguration} from "../../src/model/LedgerConfiguration";

export const ArbitraryLedgerConfiguration: jsc.Arbitrary<LedgerConfiguration> = jsc.pair(ArbitraryDuration, ArbitraryDuration).smap<LedgerConfiguration>(
    ([maxTtl, minTtl]) => {
        return {
            maxTtl: maxTtl,
            minTtl: minTtl
        };
    },
    ledgerConfiguration => {
        return [ledgerConfiguration.maxTtl, ledgerConfiguration.minTtl];
    }
);
