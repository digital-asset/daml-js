// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {PartyDetails} from "../model/PartyDetails";
import {PartyDetails as PbPartyDetails} from "../generated/com/digitalasset/ledger/api/v1/admin/party_management_service_pb"

export const PartyDetailsCodec: Codec<PbPartyDetails, PartyDetails> = {
    deserialize(message: PbPartyDetails): PartyDetails {
        const object: PartyDetails = {
            party: message.getParty(),
            isLocal: message.getIsLocal()
        };
        const displayName = message.getDisplayName();
        if (displayName !== '') {
            object.displayName = displayName;
        }
        return object;
    },
    serialize(object: PartyDetails): PbPartyDetails {
        const message = new PbPartyDetails();
        message.setParty(object.party);
        message.setIsLocal(object.isLocal);
        if (object.displayName !== undefined) {
            message.setDisplayName(object.displayName);
        }
        return message;
    }
};
