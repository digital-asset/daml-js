// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    BoolValue,
    ContractIdValue,
    DateValue,
    DecimalValue,
    EnumValue,
    Int64Value,
    ListValue,
    MapValue,
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
import {record} from "./Record";
import {IdentifierValidation} from "./IdentifierValidation";
import {integerString} from "./IntegerString";

export const BoolValueValidation = object<BoolValue>('BoolValue', () => {
    return {
        valueType: string('bool'),
        bool: native('boolean')
    }
}, noFields);

export const ContractIdValueValidation = object<ContractIdValue>('ContractIdValue', () => {
    return {
        valueType: string('contractId'),
        contractId: native('string')
    }
}, noFields);

export const DateValueValidation = object<DateValue>('DateValue', () => {
    return {
        valueType: string('date'),
        date: integerString
    }
}, noFields);

export const DecimalValueValidation = object<DecimalValue>('DecimalValue', () => {
    return {
        valueType: string('decimal'),
        decimal: native('string')
    }
}, noFields);

export const EnumValueValidation = object<EnumValue>('EnumValue', () => {
    return {
        valueType: string('enum'),
        constructor: native('string')
    }
}, () => {
    return {
        enumId: IdentifierValidation
    }
});

export const Int64ValueValidation = object<Int64Value>('Int64Value', () => {
    return {
        valueType: string('int64'),
        int64: integerString
    }
}, noFields);

export const ListValueValidation = object<ListValue>('ListValue', () => {
    return {
        valueType: string('list'),
        list: array(ValueValidation)
    }
}, noFields);

export const MapValueValidation = object<MapValue>('MapValue', () => {
    return {
        valueType: string('map'),
        map: record(ValueValidation)
    }
}, noFields);

export const PartyValueValidation = object<PartyValue>('PartyValue', () => {
    return {
        valueType: string('party'),
        party: native('string')
    }
}, noFields);

export const RecordValueValidation = object<RecordValue>('RecordValue', () => {
    return {
        valueType: string('record'),
        fields: record(ValueValidation)
    }
}, () => {
    return {
        recordId: IdentifierValidation
    }
});

export const TextValueValidation = object<TextValue>('TextValue', () => {
    return {
        valueType: string('text'),
        text: native('string')
    }
}, noFields);

export const TimestampValueValidation = object<TimestampValue>('TimestampValue', () => {
    return {
        valueType: string('timestamp'),
        timestamp: integerString
    }
}, noFields);

export const UnitValueValidation = object<UnitValue>('UnitValue', () => {
    return {
        valueType: string('unit')
    }
}, noFields);

export const VariantValueValidation = object<VariantValue>('VariantValue', () => {
    return {
        valueType: string('variant'),
        constructor: native('string'),
        value: ValueValidation,
    }
}, () => {
    return {
        variantId: IdentifierValidation,
    };
});

export const OptionalValueValidation = object<OptionalValue>('OptionalValue', () => {
    return {
        valueType: string('optional')
    }
}, () => {
    return {
        optional: ValueValidation
    }
});

function values(): { [_ in Value['valueType']]: Validation } {
    return {
        bool: BoolValueValidation,
        contractId: ContractIdValueValidation,
        date: DateValueValidation,
        decimal: DecimalValueValidation,
        enum: EnumValueValidation,
        int64: Int64ValueValidation,
        list: ListValueValidation,
        party: PartyValueValidation,
        record: RecordValueValidation,
        text: TextValueValidation,
        timestamp: TimestampValueValidation,
        unit: UnitValueValidation,
        variant: VariantValueValidation,
        optional: OptionalValueValidation,
        map: MapValueValidation
    };
}

export const ValueValidation = union('Value', 'valueType', values);
