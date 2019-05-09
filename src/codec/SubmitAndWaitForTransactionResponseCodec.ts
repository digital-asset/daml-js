// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {SubmitAndWaitForTransactionResponse} from "../model/SubmitAndWaitForTransactionResponse";
import {TransactionCodec} from "./TransactionCodec";
import {SubmitAndWaitForTransactionResponse as PbSubmitAndWaitForTransactionResponse} from "../generated/com/digitalasset/ledger/api/v1/command_service_pb";

export const SubmitAndWaitForTransactionResponseCodec: Codec<PbSubmitAndWaitForTransactionResponse, SubmitAndWaitForTransactionResponse> = {
    deserialize(message: PbSubmitAndWaitForTransactionResponse): SubmitAndWaitForTransactionResponse {
        return {
            transaction: TransactionCodec.deserialize(message.getTransaction()!)
        };
    },
    serialize(object: SubmitAndWaitForTransactionResponse): PbSubmitAndWaitForTransactionResponse {
        const result = new PbSubmitAndWaitForTransactionResponse();
        result.setTransaction(TransactionCodec.serialize(object.transaction));
        return result;
    }
};