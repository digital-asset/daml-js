// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryDuration} from './ArbitraryDuration';
import {LedgerConfiguration} from "../../src/model/LedgerConfiguration";

export const ArbitraryLedgerConfiguration: jsc.Arbitrary<LedgerConfiguration> =
    jsc.record<LedgerConfiguration>({
        maxDeduplicationTime: ArbitraryDuration,
    });

