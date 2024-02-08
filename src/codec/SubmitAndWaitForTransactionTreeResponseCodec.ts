// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {SubmitAndWaitForTransactionTreeResponse} from "../model/SubmitAndWaitForTransactionTreeResponse";
import {TransactionTreeCodec} from "./TransactionTreeCodec";
import {SubmitAndWaitForTransactionTreeResponse as PbSubmitAndWaitForTransactionTreeResponse} from "../generated/com/daml/ledger/api/v1/command_service_pb";

export const SubmitAndWaitForTransactionTreeResponseCodec: Codec<PbSubmitAndWaitForTransactionTreeResponse, SubmitAndWaitForTransactionTreeResponse> = {
    deserialize(message: PbSubmitAndWaitForTransactionTreeResponse): SubmitAndWaitForTransactionTreeResponse {
        return {
            transaction: TransactionTreeCodec.deserialize(message.getTransaction()!)
        };
    },
    serialize(object: SubmitAndWaitForTransactionTreeResponse): PbSubmitAndWaitForTransactionTreeResponse {
        const result = new PbSubmitAndWaitForTransactionTreeResponse();
        result.setTransaction(TransactionTreeCodec.serialize(object.transaction));
        return result;
    }
};