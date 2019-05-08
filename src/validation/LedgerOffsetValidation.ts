// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    LedgerOffsetAbsolute,
    LedgerOffsetBoundary,
    LedgerOffsetBoundaryValue
} from "../model/LedgerOffset";
import {noFields} from "./Validation";
import {enumeration} from "./Enumeration";
import {union} from "./Union";
import {native} from "./Native";
import {object} from "./Object";
import {string} from "./String";

const LedgerOffsetAbsoluteValidation = object<LedgerOffsetAbsolute>('LedgerOffsetAbsolute', () => ({
    offsetType: string('absolute'),
    absolute: native('string')
}), noFields);

const LedgerOffsetBoundaryValidation = object<LedgerOffsetBoundary>('LedgerOffsetBoundary', () => ({
    offsetType: string('boundary'),
    boundary: enumeration(LedgerOffsetBoundaryValue, 'LedgerOffsetBoundaryValue')
}), noFields);

function values() {
    return {
        absolute: LedgerOffsetAbsoluteValidation,
        boundary: LedgerOffsetBoundaryValidation
    };
}

export const LedgerOffsetValidation = union('LedgerOffset', 'offsetType', values);
