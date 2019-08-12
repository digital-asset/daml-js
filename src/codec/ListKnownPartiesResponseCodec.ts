// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {ListKnownPartiesResponse} from "../model/ListKnownPartiesResponse";
import {ListKnownPartiesResponse as PbListKnownPartiesResponse, PartyDetails as PbPartyDetails} from "../generated/com/digitalasset/ledger/api/v1/admin/party_management_service_pb";

export const ListKnownPartiesResponseCodec: Codec<PbListKnownPartiesResponse, ListKnownPartiesResponse> = {
    deserialize(response: PbListKnownPartiesResponse): ListKnownPartiesResponse{
        const partyPbDetailsList : PbPartyDetails[] = response.getPartyDetailsList();
        const partyDetailsList = partyPbDetailsList.map(item => {
            let dName = item.getDisplayName();
            if (dName !== undefined) {
                return {
                    party: item.getParty(),
                    displayName: dName,
                    isLocal: item.getIsLocal()
                }
            } else {
                return {
                    party: item.getParty(),
                    isLocal: item.getIsLocal()
                }
            }

        });
        return {
            partyDetails: partyDetailsList
        }
    },
    serialize(response: ListKnownPartiesResponse): PbListKnownPartiesResponse{
        const result = new PbListKnownPartiesResponse();
        const pbPartyDetailsList = response.partyDetails.map(item => {
            const pbPartyDetails = new PbPartyDetails();
            pbPartyDetails.setParty(item.party);
            if (item.displayName !== undefined) {
                const dName: string = item.displayName;
                pbPartyDetails.setDisplayName(dName);
            }
            pbPartyDetails.setIsLocal(item.isLocal);
            return pbPartyDetails;
        });
        result.setPartyDetailsList(pbPartyDetailsList);
        return result;
    }
}