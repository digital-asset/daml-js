// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {GetTransactionTreesResponse} from "../model/GetTransactionTreesResponse";
import {TransactionTreeCodec} from "./TransactionTreeCodec";
import {GetTransactionTreesResponse as PbGetTransactionTreesResponse} from "../generated/com/digitalasset/ledger/api/v1/transaction_service_pb";

export const GetTransactionTreesResponseCodec: Codec<PbGetTransactionTreesResponse, GetTransactionTreesResponse> = {
    deserialize(message: PbGetTransactionTreesResponse): GetTransactionTreesResponse {
        return {
            transactions: message.getTransactionsList().map(t => TransactionTreeCodec.deserialize(t))
        };
    },
    serialize(object: GetTransactionTreesResponse): PbGetTransactionTreesResponse {
        const message = new PbGetTransactionTreesResponse();
        message.setTransactionsList(object.transactions.map(t => TransactionTreeCodec.serialize(t)))
        return message;
    }
};