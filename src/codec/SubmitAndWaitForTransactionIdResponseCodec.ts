// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {SubmitAndWaitForTransactionIdResponse} from "../model/SubmitAndWaitForTransactionIdResponse";
import {SubmitAndWaitForTransactionIdResponse as PbSubmitAndWaitForTransactionIdResponse} from "../generated/com/daml/ledger/api/v1/command_service_pb";

export const SubmitAndWaitForTransactionIdResponseCodec: Codec<PbSubmitAndWaitForTransactionIdResponse, SubmitAndWaitForTransactionIdResponse> = {
    deserialize(message: PbSubmitAndWaitForTransactionIdResponse): SubmitAndWaitForTransactionIdResponse {
        return {
            transactionId: message.getTransactionId()
        };
    },
    serialize(object: SubmitAndWaitForTransactionIdResponse): PbSubmitAndWaitForTransactionIdResponse {
        const result = new PbSubmitAndWaitForTransactionIdResponse();
        result.setTransactionId(object.transactionId);
        return result;
    }
};