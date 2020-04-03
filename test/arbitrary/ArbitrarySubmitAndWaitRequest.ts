// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryCommands} from './ArbitraryCommands';
import {SubmitAndWaitRequest} from "../../src/model/SubmitAndWaitRequest";

export const ArbitrarySubmitAndWaitRequest: jsc.Arbitrary<SubmitAndWaitRequest> = ArbitraryCommands.smap<SubmitAndWaitRequest>(
    commands => ({
        commands: commands
    }),
    request => request.commands
);
