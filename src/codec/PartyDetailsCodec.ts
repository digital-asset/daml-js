// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {PartyDetails} from "../model/PartyDetails";
import {PartyDetails as PbPartyDetails} from "../generated/com/digitalasset/ledger/api/v1/admin/party_management_service_pb"

export const PartyDetailsCodec: Codec<PbPartyDetails, PartyDetails> = {
    deserialize(request: PbPartyDetails): PartyDetails{
        return {
            party: request.getParty(),
            display_name: request.getDisplayName(),
            is_local: request.getIsLocal()
        };
    },
    serialize(request: PartyDetails): PbPartyDetails{
        const result = new PbPartyDetails();
        result.setParty(request.party);
        result.setDisplayName(request.display_name);
        result.setIsLocal(request.is_local);
        return result;
    }
};
