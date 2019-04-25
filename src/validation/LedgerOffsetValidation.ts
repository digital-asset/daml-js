// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {LedgerOffset} from "../model/LedgerOffset";
import {Validation} from "./Validation";
import {enumeration} from "./Enumeration";
import {union} from "./Union";
import {native} from "./Native";

function values(): Record<keyof LedgerOffset, Validation> {
    return {
        absolute: native('string'),
        boundary: enumeration(LedgerOffset.Boundary, 'LedgerOffset.Boundary'),
    };
}

export const LedgerOffsetValidation = union<LedgerOffset>('LedgerOffset', values);
