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
        __type__: string('bool'),
        bool: native('boolean')
    }
}, noFields);

export const ContractIdValueValidation = object<ContractIdValue>('ContractIdValue', () => {
    return {
        __type__: string('contractId'),
        contractId: native('string')
    }
}, noFields);

export const DateValueValidation = object<DateValue>('DateValue', () => {
    return {
        __type__: string('date'),
        date: native('string')
    }
}, noFields);

export const DecimalValueValidation = object<DecimalValue>('DecimalValue', () => {
    return {
        __type__: string('decimal'),
        decimal: native('string')
    }
}, noFields);

export const Int64ValueValidation = object<Int64Value>('Int64Value', () => {
    return {
        __type__: string('int64'),
        int64: native('string')
    }
}, noFields);

export const ListValueValidation = object<ListValue>('ListValue', () => {
    return {
        __type__: string('list'),
        list: array(ValueValidation)
    }
}, noFields);

export const PartyValueValidation = object<PartyValue>('PartyValue', () => {
    return {
        __type__: string('party'),
        party: native('string')
    }
}, noFields);

export const RecordValueValidation = object<RecordValue>('RecordValue', () => {
    return {
        __type__: string('record'),
        record: RecordValidation
    }
}, noFields);

export const TextValueValidation = object<TextValue>('TextValue', () => {
    return {
        __type__: string('text'),
        text: native('string')
    }
}, noFields);

export const TimestampValueValidation = object<TimestampValue>('TimestampValue', () => {
    return {
        __type__: string('timestamp'),
        timestamp: native('string')
    }
}, noFields);

export const UnitValueValidation = object<UnitValue>('UnitValue', () => {
    return {
        __type__: string('unit')
    }
}, noFields);

export const VariantValueValidation = object<VariantValue>('VariantValue', () => {
    return {
        __type__: string('variant'),
        variant: VariantValidation
    }
}, noFields);

export const OptionalValueValidation = object<OptionalValue>('DateValue', () => {
    return {
        __type__: string('date')
    }
}, () => {
    return {
        optional: ValueValidation
    }
});

function values(): { [_ in Value['__type__']]: Validation } {
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
