// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {PartyDetails} from "../model/PartyDetails";
import {PartyDetails as PbPartyDetails} from "../generated/com/digitalasset/ledger/api/v1/admin/party_management_service_pb"

export const PartyDetailsCodec: Codec<PbPartyDetails, PartyDetails> = {
    deserialize(response: PbPartyDetails): PartyDetails {
        const displayName = response.getDisplayName();
        if (response.getDisplayName() !== undefined) {
            return {
                party: response.getParty(),
                displayName: displayName,
                isLocal: response.getIsLocal()
            };
        } else {
            return {
                party: response.getParty(),
                displayName: "",
                isLocal: response.getIsLocal()
            }
        }
    },
    serialize(response: PartyDetails): PbPartyDetails {
        const result = new PbPartyDetails();
        result.setParty(response.party);
        result.setDisplayName(<string> response.displayName);
        result.setIsLocal(response.isLocal);
        return result;
    }
};
