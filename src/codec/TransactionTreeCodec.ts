// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {Codec} from "./Codec";
import {TransactionTree} from "../model/TransactionTree";
import {TreeEvent} from "../model/TreeEvent";
import {TreeEventCodec} from "./TreeEventCodec";
import {TimestampCodec} from "./TimestampCodec";
import {TransactionTree as PbTransactionTree} from "../generated/com/digitalasset/ledger/api/v1/transaction_pb";

export const TransactionTreeCodec: Codec<PbTransactionTree, TransactionTree> = {
    deserialize(message: PbTransactionTree): TransactionTree {
        const eventsById: Record<string, TreeEvent> = {};
        message.getEventsByIdMap().forEach((event, id) => {
            eventsById[id] = TreeEventCodec.deserialize(event);
        });
        const transactionTree: TransactionTree = {
            effectiveAt: TimestampCodec.deserialize(message.getEffectiveAt()!),
            eventsById: eventsById,
            rootEventIds: [...message.getRootEventIdsList()],
            offset: message.getOffset(),
            transactionId: message.getTransactionId(),
        };
        const commandId = message.getCommandId();
        if (commandId !== undefined && commandId !== '') {
            transactionTree.commandId = commandId;
        }
        const workflowId = message.getWorkflowId();
        if (workflowId !== undefined && workflowId !== '') {
            transactionTree.workflowId = workflowId;
        }
        return transactionTree;
    },
    serialize(object: TransactionTree): PbTransactionTree {
        const message = new PbTransactionTree();
        message.setEffectiveAt(TimestampCodec.serialize(object.effectiveAt));
        for (const id in object.eventsById) {
            const event = TreeEventCodec.serialize(object.eventsById[id]);
            message.getEventsByIdMap().set(id, event);
        }
        message.setRootEventIdsList([...object.rootEventIds]);
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