// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {GetTransactionResponse} from "../model/GetTransactionResponse";
import {TransactionTreeCodec} from "./TransactionTreeCodec";
import {GetTransactionResponse as PbGetTransactionResponse} from "../generated/com/digitalasset/ledger/api/v1/transaction_service_pb";

export const GetTransactionResponseCodec: Codec<PbGetTransactionResponse, GetTransactionResponse> = {
    deserialize(message: PbGetTransactionResponse): GetTransactionResponse {
        return {
            transaction: TransactionTreeCodec.deserialize(message.getTransaction()!)
        };
    },
    serialize(object: GetTransactionResponse): PbGetTransactionResponse {
        const message = new PbGetTransactionResponse();
        message.setTransaction(TransactionTreeCodec.serialize(object.transaction));
        return message;
    }
};