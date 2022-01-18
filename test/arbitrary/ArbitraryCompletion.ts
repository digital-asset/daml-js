// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {Completion} from "../../src/model/Completion";
import {maybe} from "./Maybe";
import {ArbitraryStatus} from "./ArbitraryStatus";

export const ArbitraryCompletion: jsc.Arbitrary<Completion> =
    jsc.record<Completion>({
        commandId: jsc.string,
        status: maybe(ArbitraryStatus),
        transactionId: maybe(jsc.string)
    });
