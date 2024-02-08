// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryIdentifier} from './ArbitraryIdentifier';
import {maybe} from './Maybe';
import {Record as LedgerRecord} from "../../src/model/Record";
import {RecordValue, VariantValue, Value} from "../../src/model/Value";
import {Variant} from "../../src/model/Variant";
import {ArbitraryIntegerString} from "./ArbitraryIntegerString";

declare module 'jsverify' {
    function letrec<K extends string, V>(
        tie: (mapping: (key: K) => jsc.Arbitrary<V>) => Record<K, jsc.Arbitrary<V>>
    ): Record<K, jsc.Arbitrary<V>>;
}

const ArbitraryBoolValue = jsc.record({
    valueType: jsc.constant("bool"),
    bool: jsc.bool
}) as jsc.Arbitrary<Value>;

const ArbitraryContractIdValue = jsc.record({
    valueType: jsc.constant("contractId"),
    contractId: jsc.string
}) as jsc.Arbitrary<Value>;

const ArbitraryDateValue = jsc.record({
    valueType: jsc.constant("date"),
    date: ArbitraryIntegerString
}) as jsc.Arbitrary<Value>;

const ArbitraryDecimalValue = jsc.record({
    valueType: jsc.constant("decimal"),
    decimal: jsc.string
}) as jsc.Arbitrary<Value>;

const ArbitraryEnumValue = jsc.record({
    valueType: jsc.constant("enum"),
    constructor: jsc.string
}) as jsc.Arbitrary<Value>;

const ArbitraryInt64Value = jsc.record({
    valueType: jsc.constant("int64"),
    int64: ArbitraryIntegerString
}) as jsc.Arbitrary<Value>;

const ArbitraryPartyValue = jsc.record({
    valueType: jsc.constant("party"),
    party: jsc.string
}) as jsc.Arbitrary<Value>;

const ArbitraryTextValue = jsc.record({
    valueType: jsc.constant("text"),
    text: jsc.string
}) as jsc.Arbitrary<Value>;

const ArbitraryTimestampValue = jsc.record({
    valueType: jsc.constant("timestamp"),
    timestamp: ArbitraryIntegerString
}) as jsc.Arbitrary<Value>;

const ArbitraryUnitValue = jsc.constant({
    valueType: "unit"
}) as jsc.Arbitrary<Value>;

const { ArbitraryRecordValue, ArbitraryVariantValue, ArbitraryValue } =
    jsc.letrec<string, Value>(tie => ({
        ArbitraryListValue: jsc.record({
            valueType: jsc.constant('list'),
            list: jsc.array(tie('ArbitraryValue'))
        }) as jsc.Arbitrary<Value>,
        ArbitraryMapValue: jsc.record({
            valueType: jsc.constant('map'),
            map: jsc.dict(tie('ArbitraryValue'))
        }) as jsc.Arbitrary<Value>,
        ArbitraryOptionalValue: jsc.record({
            valueType: jsc.constant('optional'),
            optional: maybe(tie('ArbitraryValue'))
        }) as jsc.Arbitrary<Value>,
        ArbitraryRecordValue: jsc.record({
            valueType: jsc.constant('record'),
            recordId: maybe(ArbitraryIdentifier),
            fields: jsc.dict(tie('ArbitraryValue'))
        }) as jsc.Arbitrary<Value>,
        ArbitraryVariantValue: jsc.record({
            valueType: jsc.constant('variant'),
            constructor: jsc.string,
            variantId: maybe(ArbitraryIdentifier),
            value: tie('ArbitraryValue')
        }) as jsc.Arbitrary<Value>,
        ArbitraryValue: jsc.oneof([
            ArbitraryBoolValue,
            ArbitraryContractIdValue,
            ArbitraryDateValue,
            ArbitraryDecimalValue,
            ArbitraryEnumValue,
            ArbitraryInt64Value,
            tie('ArbitraryListValue'),
            tie('ArbitraryMapValue'),
            tie('ArbitraryOptionalValue'),
            ArbitraryPartyValue,
            tie('ArbitraryRecordValue'),
            ArbitraryTextValue,
            ArbitraryTimestampValue,
            ArbitraryUnitValue,
            tie('ArbitraryVariantValue')
        ])
    }));

export { ArbitraryValue };

export const ArbitraryRecord: jsc.Arbitrary<LedgerRecord> = (ArbitraryRecordValue as jsc.Arbitrary<RecordValue>).smap<LedgerRecord>(v => { return { recordId: v.recordId, fields: v.fields } }, v => { return { valueType: 'record', ...v}; });
export const ArbitraryVariant: jsc.Arbitrary<Variant> = (ArbitraryVariantValue as jsc.Arbitrary<VariantValue>).smap<Variant>(v => { return { variantId: v.variantId, constructor: v.constructor, value: v.value } }, v => { return { valueType: 'variant', ...v }; });
