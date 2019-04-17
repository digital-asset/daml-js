// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';
import {Transaction} from "../../src/model/Transaction";
import {maybe} from "./Maybe";
import {ArbitraryTimestamp} from "./ArbitraryTimestamp";
import {ArbitraryEvent} from "./ArbitraryEvent";

export const ArbitraryTransaction: jsc.Arbitrary<Transaction> = jsc
    .tuple([
        maybe(jsc.string),
        ArbitraryTimestamp,
        jsc.array(ArbitraryEvent),
        jsc.string,
        jsc.string,
        maybe(jsc.string)
    ])
    .smap<Transaction>(
        ([commandId, effectiveAt, events, offset, transactionId, workflowId]) => {
            const transaction: Transaction = {
                effectiveAt: effectiveAt,
                events: events,
                offset: offset,
                transactionId: transactionId
            };
            if (commandId) {
                transaction.commandId = commandId;
            }
            if (workflowId) {
                transaction.workflowId = workflowId;
            }
            return transaction;
        },
        transaction => [
            transaction.commandId,
            transaction.effectiveAt,
            transaction.events,
            transaction.offset,
            transaction.transactionId,
            transaction.workflowId
        ]
    );
