// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {Commands} from "../../src/model/Commands";
import {ArbitraryCommand} from "./ArbitraryCommand";
import {maybe} from "./Maybe";

export const ArbitraryCommands: jsc.Arbitrary<Commands> =
    jsc.record<Commands>({
        applicationId: jsc.string,
        commandId: jsc.string,
        party: jsc.string,
        workflowId: maybe(jsc.string),
        list: jsc.array(ArbitraryCommand),
    });
