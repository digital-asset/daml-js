// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {GetTransactionByIdRequest} from "../model/GetTransactionByIdRequest";
import {GetTransactionByIdRequest as PbGetTransactionByIdRequest} from "../generated/com/daml/ledger/api/v1/transaction_service_pb";

export const GetTransactionByIdRequestCodec: Codec<PbGetTransactionByIdRequest, GetTransactionByIdRequest> = {
    deserialize(message: PbGetTransactionByIdRequest): GetTransactionByIdRequest {
        return {
            transactionId: message.getTransactionId(),
            requestingParties: message.getRequestingPartiesList()
        };
    },
    serialize(object: GetTransactionByIdRequest): PbGetTransactionByIdRequest {
        const message = new PbGetTransactionByIdRequest();
        message.setTransactionId(object.transactionId);
        message.setRequestingPartiesList(object.requestingParties);
        return message;
    }
};