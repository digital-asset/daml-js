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
    __type__: string('absolute'),
    absolute: native('string')
}), noFields);

const LedgerOffsetBoundaryValidation = object<LedgerOffsetBoundary>('LedgerOffsetBoundary', () => ({
    __type__: string('boundary'),
    boundary: enumeration(LedgerOffsetBoundaryValue, 'LedgerOffsetBoundaryValue')
}), noFields);

function values(): { [_ in LedgerOffset['__type__']]: Validation } {
    return {
        absolute: LedgerOffsetAbsoluteValidation,
        boundary: LedgerOffsetBoundaryValidation
    };
}

export const LedgerOffsetValidation = union<LedgerOffset>('LedgerOffset', values);
