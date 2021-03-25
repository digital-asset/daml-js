// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {Status} from "../model/Status";
import {AnyCodec} from "./AnyCodec";
import {Status as PbStatus} from "../generated/google/rpc/status_pb";

export const StatusCodec: Codec<PbStatus, Status> = {
    deserialize(message: PbStatus): Status {
        return {
            code: message.getCode(),
            message: message.getMessage(),
            details: message.getDetailsList().map((a) => AnyCodec.deserialize(a))
        };
    },
    serialize(object: Status): PbStatus {
        const message = new PbStatus();
        message.setCode(object.code);
        message.setMessage(object.message);
        message.setDetailsList(object.details.map((a) => AnyCodec.serialize(a)));
        return message;
    }
};