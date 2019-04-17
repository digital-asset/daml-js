// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {LedgerOffset} from "../model/LedgerOffset";
import {LedgerOffset as PbLedgerOffset} from "../generated/com/digitalasset/ledger/api/v1/ledger_offset_pb";

import {inspect} from 'util';
import {Codec} from "./Codec";

export const LedgerOffsetCodec: Codec<PbLedgerOffset, LedgerOffset> = {
    deserialize(ledgerOffset: PbLedgerOffset): LedgerOffset {
        if (ledgerOffset.hasAbsolute()) {
            return {absolute: ledgerOffset.getAbsolute()}
        } else if (ledgerOffset.hasBoundary()) {
            const boundary = ledgerOffset.getBoundary();
            switch (boundary) {
                case PbLedgerOffset.LedgerBoundary.LEDGER_BEGIN: {
                    return {boundary: LedgerOffset.Boundary.BEGIN}
                }
                case PbLedgerOffset.LedgerBoundary.LEDGER_END: {
                    return {boundary: LedgerOffset.Boundary.END}
                }
                default: {
                    throw new Error(`Expected LedgerOffset Boundary, found ${inspect(boundary)}`);
                }
            }
        } else {
            throw new Error(`Expected either LedgerOffset Absolute or LedgerOffset Boundary, found ${inspect(ledgerOffset)}`);
        }
    },
    serialize(ledgerOffset: LedgerOffset): PbLedgerOffset {
        const result = new PbLedgerOffset();
        if (ledgerOffset.boundary !== undefined) {
            switch (ledgerOffset.boundary) {
                case LedgerOffset.Boundary.BEGIN: {
                    result.setBoundary(PbLedgerOffset.LedgerBoundary.LEDGER_BEGIN);
                    break;
                }
                case LedgerOffset.Boundary.END: {
                    result.setBoundary(PbLedgerOffset.LedgerBoundary.LEDGER_END);
                    break;
                }
                default: {
                    throw new Error(`Expected boundary, found ${inspect(ledgerOffset.boundary!)}`);
                }
            }
        } else if (ledgerOffset.absolute) {
            result.setAbsolute(ledgerOffset.absolute);
        } else {
            throw new Error(`Expected either LedgerOffset Absolute or LedgerOffset Boundary, found ${inspect(ledgerOffset)}`);
        }
        return result;
    }
};