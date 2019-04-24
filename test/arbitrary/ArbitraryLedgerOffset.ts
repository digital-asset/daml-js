// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

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
        kind: jsc.constant("boundary"),
        boundary: ArbitraryLedgerOffsetBoundaryValue
    });

export const ArbitraryLedgerOffsetAbsolute: jsc.Arbitrary<LedgerOffsetAbsolute> =
    jsc.record<LedgerOffsetAbsolute>({
        kind: jsc.constant("absolute"),
        absolute: jsc.string
    });

export const ArbitraryLedgerOffset: jsc.Arbitrary<LedgerOffset> = jsc.oneof([ArbitraryLedgerOffsetBoundary, ArbitraryLedgerOffsetAbsolute]);
