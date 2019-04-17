// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {Codec} from './Codec';
import {LedgerOffsetCodec} from './LedgerOffsetCodec';
import {TimestampCodec} from './TimestampCodec'
import {Checkpoint} from '../model/Checkpoint';
import {Checkpoint as PbCheckpoint} from '../generated/com/digitalasset/ledger/api/v1/command_completion_service_pb';

export const CheckpointCodec: Codec<PbCheckpoint, Checkpoint> = {
    deserialize(message: PbCheckpoint): Checkpoint {
        return {
            offset: LedgerOffsetCodec.deserialize(message.getOffset()!),
            recordTime: TimestampCodec.deserialize(message.getRecordTime()!)
        };
    },
    serialize(object: Checkpoint): PbCheckpoint {
        const message = new PbCheckpoint();
        message.setOffset(LedgerOffsetCodec.serialize(object.offset));
        message.setRecordTime(TimestampCodec.serialize(object.recordTime));
        return message;
    }
};