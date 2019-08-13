// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from './Codec';
import {Any} from '../model/Any';
import {Any as PbAny} from 'google-protobuf/google/protobuf/any_pb';

export const AnyCodec: Codec<PbAny, Any> = {
    deserialize(message: PbAny): Any {
        return {
            value: message.getValue_asB64(),
            typeUrl: message.getTypeUrl()
        }
    },
    serialize(object: Any): PbAny {
        const message = new PbAny();
        message.setValue(object.value);
        message.setTypeUrl(object.typeUrl);
        return message;
    }
};