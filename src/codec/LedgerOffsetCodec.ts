// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {LedgerOffset, LedgerOffsetBoundaryValue} from "../model/LedgerOffset";
import {LedgerOffset as PbLedgerOffset} from "../generated/com/digitalasset/ledger/api/v1/ledger_offset_pb";
import {Codec} from "./Codec";

export const LedgerOffsetCodec: Codec<PbLedgerOffset, LedgerOffset> = {
    deserialize(message: PbLedgerOffset): LedgerOffset {
        if (message.hasAbsolute()) {
            return {
                __type__: 'absolute',
                absolute: message.getAbsolute()
            };
        } else if (message.hasBoundary()) {
            const boundary = message.getBoundary();
            switch (boundary) {
                case PbLedgerOffset.LedgerBoundary.LEDGER_BEGIN: {
                    return {__type__: 'boundary', boundary: LedgerOffsetBoundaryValue.BEGIN}
                }
                case PbLedgerOffset.LedgerBoundary.LEDGER_END: {
                    return {__type__: 'boundary', boundary: LedgerOffsetBoundaryValue.END}
                }
                default:
                    throw new Error('Deserialization error, unable to discriminate value type - this is likely to be a bug');
            }
        } else {
            throw new Error('Deserialization error, unable to discriminate value type - this is likely to be a bug');
        }
    },
    serialize(object: LedgerOffset): PbLedgerOffset {
        const result = new PbLedgerOffset();
        switch (object.__type__) {
            case "absolute":
                result.setAbsolute(object.absolute);
                break;
            case "boundary":
                switch (object.boundary) {
                    case LedgerOffsetBoundaryValue.BEGIN:
                        result.setBoundary(PbLedgerOffset.LedgerBoundary.LEDGER_BEGIN);
                        break;
                    case LedgerOffsetBoundaryValue.END:
                        result.setBoundary(PbLedgerOffset.LedgerBoundary.LEDGER_END);
                        break;
                }
        }
        return result;
    }
};