// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {
    LedgerOffset,
    LedgerOffsetAbsolute,
    LedgerOffsetBoundary,
    LedgerOffsetBoundaryValue
} from "../model/LedgerOffset";
import {noFields, Validation} from "./Validation";
import {enumeration} from "./Enumeration";
import {union} from "./Union";
import {native} from "./Native";
import {object} from "./Object";
import {string} from "./String";

const LedgerOffsetAbsoluteValidation = object<LedgerOffsetAbsolute>('LedgerOffsetAbsolute', () => ({
    kind: string('absolute'),
    absolute: native('string')
}), noFields);

const LedgerOffsetBoundaryValidation = object<LedgerOffsetBoundary>('LedgerOffsetBoundary', () => ({
    kind: string('boundary'),
    boundary: enumeration(LedgerOffsetBoundaryValue, 'LedgerOffsetBoundaryValue')
}), noFields);

function values(): { [_ in LedgerOffset['kind']]: Validation } {
    return {
        absolute: LedgerOffsetAbsoluteValidation,
        boundary: LedgerOffsetBoundaryValidation
    };
}

export const LedgerOffsetValidation = union<LedgerOffset>('LedgerOffset', values);
