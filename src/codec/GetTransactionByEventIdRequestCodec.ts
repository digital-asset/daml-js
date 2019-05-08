// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {GetTransactionByEventIdRequest} from "../model/GetTransactionByEventIdRequest";
import {GetTransactionByEventIdRequest as PbGetTransactionByEventIdRequest} from "../generated/com/digitalasset/ledger/api/v1/transaction_service_pb";

export const GetTransactionByEventIdRequestCodec: Codec<PbGetTransactionByEventIdRequest, GetTransactionByEventIdRequest> = {
    deserialize(message: PbGetTransactionByEventIdRequest): GetTransactionByEventIdRequest {
        return {
            eventId: message.getEventId(),
            requestingParties: message.getRequestingPartiesList()
        };
    },
    serialize(object: GetTransactionByEventIdRequest): PbGetTransactionByEventIdRequest {
        const message = new PbGetTransactionByEventIdRequest();
        message.setEventId(object.eventId);
        message.setRequestingPartiesList(object.requestingParties);
        return message;
    }
};