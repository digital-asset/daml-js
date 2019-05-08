// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {Transaction} from "../model/Transaction";
import {TimestampCodec} from "./TimestampCodec";
import {EventCodec} from "./EventCodec";
import {Transaction as PbTransaction} from "../generated/com/digitalasset/ledger/api/v1/transaction_pb";

export const TransactionCodec: Codec<PbTransaction, Transaction> = {
    deserialize(message: PbTransaction): Transaction {
        const transaction: Transaction = {
            effectiveAt: TimestampCodec.deserialize(message.getEffectiveAt()!),
            events: message.getEventsList().map((event) => EventCodec.deserialize(event)),
            offset: message.getOffset(),
            transactionId: message.getTransactionId(),
        };
        const commandId = message.getCommandId();
        if (commandId !== undefined && commandId !== '') {
            transaction.commandId = commandId;
        }
        const workflowId = message.getWorkflowId();
        if (workflowId !== undefined && workflowId !== '') {
            transaction.workflowId = workflowId;
        }
        return transaction;
    },
    serialize(object: Transaction): PbTransaction {
        const message = new PbTransaction();
        message.setEffectiveAt(TimestampCodec.serialize(object.effectiveAt));
        message.setEventsList(object.events.map((event) => EventCodec.serialize(event)));
        message.setOffset(object.offset);
        message.setTransactionId(object.transactionId);
        if (object.commandId) {
            message.setCommandId(object.commandId);
        }
        if (object.workflowId) {
            message.setWorkflowId(object.workflowId);
        }
        return message;
    }
};