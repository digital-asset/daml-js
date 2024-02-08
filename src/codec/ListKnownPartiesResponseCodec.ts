// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {PartyDetailsCodec} from "./PartyDetailsCodec";
import {ListKnownPartiesResponse} from "../model/ListKnownPartiesResponse";
import {ListKnownPartiesResponse as PbListKnownPartiesResponse, PartyDetails as PbPartyDetails} from "../generated/com/daml/ledger/api/v1/admin/party_management_service_pb";

export const ListKnownPartiesResponseCodec: Codec<PbListKnownPartiesResponse, ListKnownPartiesResponse> = {
    deserialize(response: PbListKnownPartiesResponse): ListKnownPartiesResponse{
        const partyPbDetailsList : PbPartyDetails[] = response.getPartyDetailsList();
        const partyDetailsList = partyPbDetailsList.map(item => {
            return PartyDetailsCodec.deserialize(item);
        });
        return {
            partyDetails: partyDetailsList
        }
    },
    serialize(response: ListKnownPartiesResponse): PbListKnownPartiesResponse{
        const result = new PbListKnownPartiesResponse();
        const pbPartyDetailsList = response.partyDetails.map(item => {
            return PartyDetailsCodec.serialize(item);
        });
        result.setPartyDetailsList(pbPartyDetailsList);
        return result;
    }
}