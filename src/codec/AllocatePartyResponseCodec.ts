// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {PartyDetailsCodec} from "./PartyDetailsCodec";
import {AllocatePartyResponse} from "../model/AllocatePartyResponse";
import {AllocatePartyResponse as PbAllocatePartyResponse} from "../generated/com/daml/ledger/api/v1/admin/party_management_service_pb"

export const AllocatePartyResponseCodec: Codec<PbAllocatePartyResponse, AllocatePartyResponse> = {
    deserialize(message: PbAllocatePartyResponse): AllocatePartyResponse {
        return {
            partyDetails: PartyDetailsCodec.deserialize(message.getPartyDetails()!)
        };
    },
    serialize(object: AllocatePartyResponse): PbAllocatePartyResponse {
        const message = new PbAllocatePartyResponse();
        message.setPartyDetails(PartyDetailsCodec.serialize(object.partyDetails));
        return message;
    }
};
