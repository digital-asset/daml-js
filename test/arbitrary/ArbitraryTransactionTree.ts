// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {TransactionTree} from "../../src/model/TransactionTree";
import {maybe} from "./Maybe";
import {ArbitraryTimestamp} from "./ArbitraryTimestamp";
import {ArbitraryTreeEvent} from "./ArbitraryEvent";

export const ArbitraryTransactionTree: jsc.Arbitrary<TransactionTree> = jsc
    .tuple([
        maybe(jsc.string),
        ArbitraryTimestamp,
        jsc.dict(ArbitraryTreeEvent),
        jsc.array(jsc.string),
        jsc.string,
        jsc.string,
        maybe(jsc.string)
    ])
    .smap<TransactionTree>(
        ([
             commandId,
             effectiveAt,
             eventsById,
             rootEventsId,
             offset,
             transactionId,
             workflowId
         ]) => {
            const transactionTree: TransactionTree = {
                effectiveAt: effectiveAt,
                eventsById: eventsById,
                rootEventIds: rootEventsId,
                offset: offset,
                transactionId: transactionId
            };
            if (commandId) {
                transactionTree.commandId = commandId;
            }
            if (workflowId) {
                transactionTree.workflowId = workflowId;
            }
            return transactionTree;
        },
        transactionTree => [
            transactionTree.commandId,
            transactionTree.effectiveAt,
            transactionTree.eventsById,
            transactionTree.rootEventIds,
            transactionTree.offset,
            transactionTree.transactionId,
            transactionTree.workflowId
        ]
    );
