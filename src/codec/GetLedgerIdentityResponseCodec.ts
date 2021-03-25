// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {GetLedgerIdentityResponse} from "../model/GetLedgerIdentityResponse";
import {GetLedgerIdentityResponse as PbGetLedgerIdentityResponse} from "../generated/com/daml/ledger/api/v1/ledger_identity_service_pb";

export const GetLedgerIdentityResponseCodec: Codec<PbGetLedgerIdentityResponse, GetLedgerIdentityResponse> = {
    deserialize(response: PbGetLedgerIdentityResponse): GetLedgerIdentityResponse {
        return {
            ledgerId: response.getLedgerId()
        }
    },
    serialize(response: GetLedgerIdentityResponse): PbGetLedgerIdentityResponse {
        const result = new PbGetLedgerIdentityResponse();
        result.setLedgerId(response.ledgerId);
        return result;
    }
};