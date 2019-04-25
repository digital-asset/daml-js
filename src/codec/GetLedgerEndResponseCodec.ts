// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {Codec} from "./Codec";
import {GetLedgerEndResponse} from "../model/GetLedgerEndResponse";
import {LedgerOffsetCodec} from "./LedgerOffsetCodec";
import {GetLedgerEndResponse as PbGetLedgerEndResponse} from "../generated/com/digitalasset/ledger/api/v1/transaction_service_pb";

export const GetLedgerEndResponseCodec: Codec<PbGetLedgerEndResponse, GetLedgerEndResponse> = {
    deserialize(message: PbGetLedgerEndResponse): GetLedgerEndResponse {
        return {
            offset: LedgerOffsetCodec.deserialize(message.getOffset()!)
        };
    },
    serialize(object: GetLedgerEndResponse): PbGetLedgerEndResponse {
        const message = new PbGetLedgerEndResponse();
        message.setOffset(LedgerOffsetCodec.serialize(object.offset));
        return message;
    }
};