// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {
    LedgerOffset,
    LedgerOffsetAbsolute,
    LedgerOffsetBoundary,
    LedgerOffsetBoundaryValue
} from "../../src/model/LedgerOffset";

export const ArbitraryLedgerOffsetBoundaryValue: jsc.Arbitrary<LedgerOffsetBoundaryValue> =
    jsc.oneof([
        jsc.constant(LedgerOffsetBoundaryValue.BEGIN),
        jsc.constant(LedgerOffsetBoundaryValue.END)
    ]);

export const ArbitraryLedgerOffsetBoundary: jsc.Arbitrary<LedgerOffsetBoundary> =
    jsc.record<LedgerOffsetBoundary>({
        offsetType: jsc.constant("boundary"),
        boundary: ArbitraryLedgerOffsetBoundaryValue
    });

export const ArbitraryLedgerOffsetAbsolute: jsc.Arbitrary<LedgerOffsetAbsolute> =
    jsc.record<LedgerOffsetAbsolute>({
        offsetType: jsc.constant("absolute"),
        absolute: jsc.string
    });

export const ArbitraryLedgerOffset: jsc.Arbitrary<LedgerOffset> = jsc.oneof([ArbitraryLedgerOffsetBoundary, ArbitraryLedgerOffsetAbsolute]);
