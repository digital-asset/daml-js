// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {Checkpoint} from "../../src/model/Checkpoint";
import {ArbitraryTimestamp} from "./ArbitraryTimestamp";
import {ArbitraryLedgerOffset} from "./ArbitraryLedgerOffset";

export const ArbitraryCheckpoint: jsc.Arbitrary<Checkpoint> = jsc
    .pair(ArbitraryLedgerOffset, ArbitraryTimestamp)
    .smap<Checkpoint>(
        ([offset, recordTime]) => {
            return {
                offset: offset,
                recordTime: recordTime
            };
        },
        checkpoint => {
            return [checkpoint.offset, checkpoint.recordTime];
        }
    );
