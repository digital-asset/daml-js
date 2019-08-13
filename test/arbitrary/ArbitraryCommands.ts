// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {Commands} from "../../src/model/Commands";
import {ArbitraryTimestamp} from "./ArbitraryTimestamp";
import {ArbitraryCommand} from "./ArbitraryCommand";
import {maybe} from "./Maybe";

export const ArbitraryCommands: jsc.Arbitrary<Commands> = jsc
    .tuple([
        jsc.string,
        jsc.string,
        ArbitraryTimestamp,
        jsc.array(ArbitraryCommand),
        ArbitraryTimestamp,
        jsc.string,
        maybe(jsc.string)
    ])
    .smap<Commands>(
        ([
             applicationId,
             commandId,
             ledgerEffectiveTime,
             list,
             maximumRecordTime,
             party,
             workflowId
         ]) => ({
            applicationId: applicationId,
            commandId: commandId,
            ledgerEffectiveTime: ledgerEffectiveTime,
            list: list,
            maximumRecordTime: maximumRecordTime,
            party: party,
            workflowId: workflowId
        }),
        commands => [
            commands.applicationId,
            commands.commandId,
            commands.ledgerEffectiveTime,
            commands.list,
            commands.maximumRecordTime,
            commands.party,
            commands.workflowId
        ]
    );
