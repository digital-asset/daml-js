// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Duration as PbDuration} from 'google-protobuf/google/protobuf/duration_pb';
import {Codec} from "./Codec";
import {Duration} from "../model/Duration";

export const DurationCodec: Codec<PbDuration, Duration> = {
    deserialize(message: PbDuration): Duration {
        return {
            seconds: message.getSeconds(),
            nanoseconds: message.getNanos()
        };
    },
    serialize(object: Duration): PbDuration {
        const message = new PbDuration();
        message.setSeconds(object.seconds);
        message.setNanos(object.nanoseconds);
        return message;
    }
};