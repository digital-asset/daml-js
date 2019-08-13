// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryLedgerOffset} from './ArbitraryLedgerOffset';
import {CompletionStreamRequest} from "../../src/model/CompletionStreamRequest";
import {maybe} from "./Maybe";

export const ArbitraryCompletionStreamRequest: jsc.Arbitrary<CompletionStreamRequest> =
    jsc.record<CompletionStreamRequest>({
        applicationId: jsc.string,
        parties: jsc.array(jsc.string),
        offset: maybe(ArbitraryLedgerOffset)
    });
