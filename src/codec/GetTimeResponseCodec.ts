// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {GetTimeResponse} from "../model/GetTimeResponse";
import {TimestampCodec} from "./TimestampCodec";

import {GetTimeResponse as PbGetTimeResponse} from "../generated/com/digitalasset/ledger/api/v1/testing/time_service_pb";


export const GetTimeResponseCodec: Codec<PbGetTimeResponse, GetTimeResponse> = {
    deserialize(message: PbGetTimeResponse): GetTimeResponse {
        return {
            currentTime: TimestampCodec.deserialize(message.getCurrentTime()!)
        };
    },
    serialize(object: GetTimeResponse) {
        const message = new PbGetTimeResponse();
        message.setCurrentTime(TimestampCodec.serialize(object.currentTime));
        return message;
    }
};