// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {ListKnownPartiesResponse} from "../model/ListKnownPartiesResponse";
import {ListKnownPartiesResponse as PbListKnownPartiesResponse} from "../generated/com/digitalasset/ledger/api/v1/admin/party_management_service_pb";

export const ListKnownPartiesResponseCodec: Codec<PbListKnownPartiesResponse, ListKnownPartiesResponse> = {
    deserialize(response: PbListKnownPartiesResponse): ListKnownPartiesResponse{
        return{
            partyDetails: response.getPartyDetailsList(),
        }
    },
    serialize(response: ListKnownPartiesResponse): PbListKnownPartiesResponse{
        const result = new PbListKnownPartiesResponse();
        result.setPartyDetailsList(response.partyDetails);
        return result;
    }
}