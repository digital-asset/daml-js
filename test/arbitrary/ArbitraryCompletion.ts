// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {Completion} from "../../src/model/Completion";
import {maybe} from "./Maybe";
import {ArbitraryStatus} from "./ArbitraryStatus";

export const ArbitraryCompletion: jsc.Arbitrary<Completion> = jsc
    .pair(jsc.string, maybe(ArbitraryStatus))
    .smap<Completion>(
        ([commandId, status]) => ({
            commandId: commandId,
            status: status
        }),
        completion => [completion.commandId, completion.status]
    );
