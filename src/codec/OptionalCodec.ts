// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {Codec} from "./Codec";
import {Optional} from "../model/Optional";
import {ValueCodec} from "./ValueCodec";
import {Optional as PbOptional} from "../generated/com/digitalasset/ledger/api/v1/value_pb";

export const OptionalCodec: Codec<PbOptional, Optional> = {
    deserialize(message: PbOptional): Optional {
        const object: Optional = {};
        if (message.hasValue()) {
            object.value = ValueCodec.deserialize(message.getValue()!);
        }
        return object;
    },
    serialize(object: Optional): PbOptional {
        const message = new PbOptional();
        if (object.value !== undefined) {
            message.setValue(ValueCodec.serialize(object.value));
        }
        return message;
    }
};