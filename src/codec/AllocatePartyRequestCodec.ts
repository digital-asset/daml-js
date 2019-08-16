// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {AllocatePartyRequest} from "../model/AllocatePartyRequest";
import {AllocatePartyRequest as PbAllocatePartyRequest} from "../generated/com/digitalasset/ledger/api/v1/admin/party_management_service_pb"

export const AllocatePartyRequestCodec: Codec<PbAllocatePartyRequest, AllocatePartyRequest> = {
    deserialize(message: PbAllocatePartyRequest): AllocatePartyRequest {
        const object: AllocatePartyRequest = {};
        const partyIdHint = message.getPartyIdHint();
        if (partyIdHint !== '') {
            object.partyIdHint = partyIdHint;
        }
        const displayName = message.getDisplayName();
        if (displayName !== '') {
            object.displayName = displayName;
        }
        return object;
    },
    serialize(object: AllocatePartyRequest): PbAllocatePartyRequest {
        const message = new PbAllocatePartyRequest();
        if (object.partyIdHint !== undefined) {
            message.setPartyIdHint(object.partyIdHint);
        }
        if (object.displayName !== undefined) {
            message.setDisplayName(object.displayName);
        }
        return message;
    }
};
