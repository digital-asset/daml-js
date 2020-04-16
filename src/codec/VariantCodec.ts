// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Variant as PbVariant} from '../generated/com/daml/ledger/api/v1/value_pb';
import {Codec} from "./Codec";
import {Variant} from "../model/Variant";
import {IdentifierCodec} from "./IdentifierCodec";
import {ValueCodec} from "./ValueCodec";

export const VariantCodec: Codec<PbVariant, Variant> = {
    deserialize(message: PbVariant): Variant {
        const object: Variant = {
            constructor: message.getConstructor()!,
            value: ValueCodec.deserialize(message.getValue()!)
        };
        if (message.hasVariantId()) {
            object.variantId = IdentifierCodec.deserialize(message.getVariantId()!);
        }
        return object;
    },
    serialize(object: Variant): PbVariant {
        const message = new PbVariant();
        message.setConstructor(object.constructor);
        message.setValue(ValueCodec.serialize(object.value));
        if (object.variantId) {
            message.setVariantId(IdentifierCodec.serialize(object.variantId));
        }
        return message;
    }
};