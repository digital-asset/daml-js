// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {GetFlatTransactionResponse} from "../model/GetFlatTransactionResponse";
import {TransactionCodec} from "./TransactionCodec";
import {GetFlatTransactionResponse as PbGetFlatTransactionResponse} from "../generated/com/daml/ledger/api/v1/transaction_service_pb";

export const GetFlatTransactionResponseCodec: Codec<PbGetFlatTransactionResponse, GetFlatTransactionResponse> = {
    deserialize(message: PbGetFlatTransactionResponse): GetFlatTransactionResponse {
        return {
            transaction: TransactionCodec.deserialize(message.getTransaction()!)
        };
    },
    serialize(object: GetFlatTransactionResponse): PbGetFlatTransactionResponse {
        const message = new PbGetFlatTransactionResponse();
        message.setTransaction(TransactionCodec.serialize(object.transaction));
        return message;
    }
};