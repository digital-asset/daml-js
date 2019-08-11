// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {PartyDetails} from "../model/PartyDetails";
import {PartyDetails as PbPartyDetails} from "../generated/com/digitalasset/ledger/api/v1/admin/party_management_service_pb"

export const PartyDetailsCodec: Codec<PbPartyDetails, PartyDetails> = {
    deserialize(response: PbPartyDetails): PartyDetails{
        return {
            party: response.getParty(),
            displayName: response.getDisplayName(),
            isLocal: response.getIsLocal()
        };
    },
    serialize(response: PartyDetails): PbPartyDetails{
        const result = new PbPartyDetails();
        result.setParty(response.party);
        result.setDisplayName(response.displayName);
        result.setIsLocal(response.isLocal);
        return result;
    }
};
