// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Timestamp as PbTimestamp} from 'google-protobuf/google/protobuf/timestamp_pb';
import {Timestamp} from "../model/Timestamp";
import {Codec} from "./Codec";

export const TimestampCodec: Codec<PbTimestamp, Timestamp> = {
    deserialize(timestamp: PbTimestamp): Timestamp {
        return {
            seconds: timestamp.getSeconds(),
            nanoseconds: timestamp.getNanos()
        }
    },
    serialize(timestamp: Timestamp): PbTimestamp {
        const result = new PbTimestamp();
        result.setSeconds(timestamp.seconds);
        result.setNanos(timestamp.nanoseconds);
        return result;
    }
};