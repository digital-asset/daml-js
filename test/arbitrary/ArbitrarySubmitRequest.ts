// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryCommands} from './ArbitraryCommands';
import {SubmitRequest} from "../../src/model/SubmitRequest";

export const ArbitrarySubmitRequest: jsc.Arbitrary<SubmitRequest> = ArbitraryCommands.smap<SubmitRequest>(
    commands => ({
        commands: commands
    }),
    request => request.commands
);
