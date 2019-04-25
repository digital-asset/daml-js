// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {EmptyValidation} from "./EmptyValidation";
import {OptionalValidation} from "./OptionalValidation";
import {RecordValidation} from "./RecordValidation";
import {VariantValidation} from "./VariantValidation";
import {Value} from "../model/Value";
import {Validation} from "./Validation";
import {native} from "./Native";
import {array} from "./Array";
import {union} from "./Union";

function values(): Record<keyof Value, Validation> {
    return {
        bool: native('boolean'),
        contractId: native('string'),
        date: native('string'),
        decimal: native('string'),
        int64: native('string'),
        list: array(ValueValidation),
        party: native('string'),
        record: RecordValidation,
        text: native('string'),
        timestamp: native('string'),
        unit: EmptyValidation,
        variant: VariantValidation,
        optional: OptionalValidation
    };
}

export const ValueValidation = union<Value>('Value', values);
