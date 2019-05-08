// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryLedgerOffset} from './ArbitraryLedgerOffset';
import {CompletionStreamRequest} from "../../src/model/CompletionStreamRequest";

export const ArbitraryCompletionStreamRequest: jsc.Arbitrary<CompletionStreamRequest> = jsc
    .tuple([jsc.string, ArbitraryLedgerOffset, jsc.array(jsc.string)])
    .smap<CompletionStreamRequest>(
        ([applicationId, offset, parties]) => ({
            applicationId: applicationId,
            offset: offset,
            parties: parties
        }),
        request => [request.applicationId, request.offset, request.parties]
    );
