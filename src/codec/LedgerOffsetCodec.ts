// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {LedgerOffset, LedgerOffsetBoundaryValue} from "../model/LedgerOffset";
import {LedgerOffset as PbLedgerOffset} from "../generated/com/digitalasset/ledger/api/v1/ledger_offset_pb";
import {Codec} from "./Codec";
import {ErrorMessages} from "../util/ErrorMessages";

export const LedgerOffsetCodec: Codec<PbLedgerOffset, LedgerOffset> = {
    deserialize(message: PbLedgerOffset): LedgerOffset {
        if (message.hasAbsolute()) {
            return {
                offsetType: 'absolute',
                absolute: message.getAbsolute()
            };
        } else if (message.hasBoundary()) {
            const boundary = message.getBoundary();
            switch (boundary) {
                case PbLedgerOffset.LedgerBoundary.LEDGER_BEGIN: {
                    return {offsetType: 'boundary', boundary: LedgerOffsetBoundaryValue.BEGIN}
                }
                case PbLedgerOffset.LedgerBoundary.LEDGER_END: {
                    return {offsetType: 'boundary', boundary: LedgerOffsetBoundaryValue.END}
                }
                default:
                    throw new Error(ErrorMessages.unknownDeserialization('Ledger Boundary'));
            }
        } else {
            throw new Error(ErrorMessages.unknownDeserialization('Ledger Offset'));
        }
    },
    serialize(object: LedgerOffset): PbLedgerOffset {
        const result = new PbLedgerOffset();
        switch (object.offsetType) {
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