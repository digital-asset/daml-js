// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {RecordValidation} from "./RecordValidation";
import {VariantValidation} from "./VariantValidation";
import {
    BoolValue,
    ContractIdValue,
    DateValue,
    DecimalValue,
    Int64Value,
    ListValue,
    OptionalValue,
    PartyValue,
    RecordValue,
    TextValue,
    TimestampValue,
    UnitValue,
    Value,
    VariantValue
} from "../model/Value";
import {noFields, Validation} from "./Validation";
import {native} from "./Native";
import {array} from "./Array";
import {union} from "./Union";
import {object} from "./Object";
import {string} from "./String";

export const BoolValueValidation = object<BoolValue>('BoolValue', () => {
    return {
        kind: string('bool'),
        bool: native('boolean')
    }
}, noFields);

export const ContractIdValueValidation = object<ContractIdValue>('ContractIdValue', () => {
    return {
        kind: string('contractId'),
        contractId: native('string')
    }
}, noFields);

export const DateValueValidation = object<DateValue>('DateValue', () => {
    return {
        kind: string('date'),
        date: native('string')
    }
}, noFields);

export const DecimalValueValidation = object<DecimalValue>('DecimalValue', () => {
    return {
        kind: string('decimal'),
        decimal: native('string')
    }
}, noFields);

export const Int64ValueValidation = object<Int64Value>('Int64Value', () => {
    return {
        kind: string('int64'),
        int64: native('string')
    }
}, noFields);

export const ListValueValidation = object<ListValue>('ListValue', () => {
    return {
        kind: string('list'),
        list: array(ValueValidation)
    }
}, noFields);

export const PartyValueValidation = object<PartyValue>('PartyValue', () => {
    return {
        kind: string('party'),
        party: native('string')
    }
}, noFields);

export const RecordValueValidation = object<RecordValue>('RecordValue', () => {
    return {
        kind: string('record'),
        record: RecordValidation
    }
}, noFields);

export const TextValueValidation = object<TextValue>('TextValue', () => {
    return {
        kind: string('text'),
        text: native('string')
    }
}, noFields);

export const TimestampValueValidation = object<TimestampValue>('TimestampValue', () => {
    return {
        kind: string('timestamp'),
        timestamp: native('string')
    }
}, noFields);

export const UnitValueValidation = object<UnitValue>('UnitValue', () => {
    return {
        kind: string('unit')
    }
}, noFields);

export const VariantValueValidation = object<VariantValue>('VariantValue', () => {
    return {
        kind: string('variant'),
        variant: VariantValidation
    }
}, noFields);

export const OptionalValueValidation = object<OptionalValue>('DateValue', () => {
    return {
        kind: string('date')
    }
}, () => {
    return {
        optional: ValueValidation
    }
});

function values(): { [_ in Value['kind']]: Validation } {
    return {
        bool: BoolValueValidation,
        contractId: ContractIdValueValidation,
        date: DateValueValidation,
        decimal: DecimalValueValidation,
        int64: Int64ValueValidation,
        list: ListValueValidation,
        party: PartyValueValidation,
        record: RecordValueValidation,
        text: TextValueValidation,
        timestamp: TimestampValueValidation,
        unit: UnitValueValidation,
        variant: VariantValueValidation,
        optional: OptionalValueValidation
    };
}

export const ValueValidation = union<Value>('Value', values);
