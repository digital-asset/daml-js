// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';
import {LedgerOffset} from "../../src/model/LedgerOffset";

export const ArbitraryLedgerOffset: jsc.Arbitrary<LedgerOffset> = jsc
    .oneof([
        jsc.elements([
            LedgerOffset.Boundary.BEGIN,
            LedgerOffset.Boundary.END
        ]),
        jsc.string
    ])
    .smap<LedgerOffset>(
        value => {
            if (typeof value === 'string') {
                return {
                    absolute: value
                };
            } else {
                return {
                    boundary: value
                };
            }
        },
        ledgerOffset => {
            if (ledgerOffset.absolute !== undefined) {
                return ledgerOffset.absolute;
            } else if (ledgerOffset.boundary !== undefined) {
                return ledgerOffset.boundary;
            } else {
                throw new Error('one of the cases must be defined');
            }
        }
    );
