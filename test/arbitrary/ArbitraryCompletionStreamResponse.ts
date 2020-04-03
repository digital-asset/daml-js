// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryCheckpoint} from './ArbitraryCheckpoint';
import {ArbitraryCompletion} from './ArbitraryCompletion';
import {CompletionStreamResponse} from "../../src/model/CompletionStreamResponse";
import {maybe} from "./Maybe";

export const ArbitraryCompletionStreamResponse: jsc.Arbitrary<CompletionStreamResponse> = jsc
    .pair(maybe(ArbitraryCheckpoint), maybe(jsc.array(ArbitraryCompletion)))
    .smap<CompletionStreamResponse>(
        ([checkpoint, completions]) => ({
            checkpoint: checkpoint,
            completions: completions
        }),
        request => [request.checkpoint, request.completions]
    );
