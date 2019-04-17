// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {Codec} from "./Codec";
import {SetTimeRequest} from "../model/SetTimeRequest";
import {TimestampCodec} from "./TimestampCodec";
import {SetTimeRequest as PbSetTimeRequest} from "../generated/com/digitalasset/ledger/api/v1/testing/time_service_pb";

export const SetTimeRequestCodec: Codec<PbSetTimeRequest, SetTimeRequest> = {
    deserialize(message: PbSetTimeRequest): SetTimeRequest {
        return {
            currentTime: TimestampCodec.deserialize(message.getCurrentTime()!),
            newTime: TimestampCodec.deserialize(message.getNewTime()!)
        };
    },
    serialize(object: SetTimeRequest): PbSetTimeRequest {
        const message = new PbSetTimeRequest();
        message.setCurrentTime(TimestampCodec.serialize(object.currentTime));
        message.setNewTime(TimestampCodec.serialize(object.newTime));
        return message;
    }
};