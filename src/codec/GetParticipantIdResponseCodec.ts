// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {GetParticipantIdResponse} from "../model/GetParticipantIdResponse";
import {GetParticipantIdResponse as PbGetParticipantIdResponse} from "../generated/com/digitalasset/ledger/api/v1/admin/party_management_service_pb";

export const GetParticipantIdResponseCodec: Codec<PbGetParticipantIdResponse, GetParticipantIdResponse> = {
    deserialize(message: PbGetParticipantIdResponse): GetParticipantIdResponse{
        const object: GetParticipantIdResponse = {
            participantId: message.getParticipantId()
        };
        return object;
    },
    serialize(object: GetParticipantIdResponse): PbGetParticipantIdResponse {
        const message = new PbGetParticipantIdResponse();
        message.setParticipantId(object.participantId);
        return message;
    }
}