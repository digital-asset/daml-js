// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {GetTransactionsResponse} from "../model/GetTransactionsResponse";
import {TransactionCodec} from "./TransactionCodec";
import {GetTransactionsResponse as PbGetTransactionsResponse} from "../generated/com/daml/ledger/api/v1/transaction_service_pb";

export const GetTransactionsResponseCodec: Codec<PbGetTransactionsResponse, GetTransactionsResponse> = {
    deserialize(message: PbGetTransactionsResponse): GetTransactionsResponse {
        return {
            transactions: message.getTransactionsList().map((transactions) => TransactionCodec.deserialize(transactions))
        };
    },
    serialize(object: GetTransactionsResponse): PbGetTransactionsResponse {
        const message = new PbGetTransactionsResponse();
        message.setTransactionsList(object.transactions.map((transactions) => TransactionCodec.serialize(transactions)))
        return message;
    }
};