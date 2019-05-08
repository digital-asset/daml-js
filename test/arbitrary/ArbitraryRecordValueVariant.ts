// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryIdentifier} from './ArbitraryIdentifier';
import {maybe} from './Maybe';
import {Record as LedgerRecord} from "../../src/model/Record";
import {ListValue, RecordValue, Value, VariantValue} from "../../src/model/Value";
import {Variant} from "../../src/model/Variant";

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
    date: jsc.string
}) as jsc.Arbitrary<Value>;

const ArbitraryDecimalValue = jsc.record({
    valueType: jsc.constant("decimal"),
    decimal: jsc.string
}) as jsc.Arbitrary<Value>;

const ArbitraryInt64Value = jsc.record({
    valueType: jsc.constant("int64"),
    int64: jsc.string
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
    timestamp: jsc.string
}) as jsc.Arbitrary<Value>;

const ArbitraryUnitValue = jsc.constant({
    valueType: "unit"
}) as jsc.Arbitrary<Value>;

const { ArbitraryListValue, ArbitraryRecordValue, ArbitraryVariantValue, ArbitraryValue } =
    jsc.letrec<string, Value>(tie => ({
        ArbitraryListValue: jsc.record({
            valueType: jsc.constant('list'),
            list: jsc.array(tie('ArbitraryValue'))
        }) as jsc.Arbitrary<Value>,
        ArbitraryRecordValue: jsc.record({
            valueType: jsc.constant('record'),
            recordId: maybe(ArbitraryIdentifier),
            fields: jsc.dict(tie('ArbitraryValue'))
        }) as jsc.Arbitrary<Value>,
        ArbitraryVariantValue: jsc.record({
            valueType: jsc.constant("variant"),
            constructor: jsc.string,
            variantId: maybe(ArbitraryIdentifier),
            value: tie('ArbitraryValue')
        }) as jsc.Arbitrary<Value>,
        ArbitraryValue: jsc.oneof([
            ArbitraryBoolValue,
            ArbitraryContractIdValue,
            ArbitraryDateValue,
            ArbitraryDecimalValue,
            ArbitraryInt64Value,
            tie('ArbitraryListValue'),
            ArbitraryPartyValue,
            tie('ArbitraryRecordValue'),
            ArbitraryTextValue,
            ArbitraryTimestampValue,
            ArbitraryUnitValue,
            tie('ArbitraryVariantValue')
        ])
    }));

export { ArbitraryValue };

export const ArbitraryList: jsc.Arbitrary<Value[]> = (ArbitraryListValue as jsc.Arbitrary<ListValue>).smap(v => v.list, v => { return { valueType: 'list', list: v } });
export const ArbitraryRecord: jsc.Arbitrary<LedgerRecord> = (ArbitraryRecordValue as jsc.Arbitrary<RecordValue>).smap<LedgerRecord>(v => { return { recordId: v.recordId, fields: v.fields } }, v => { return Object.assign({ valueType: 'record'}, v); });
export const ArbitraryVariant: jsc.Arbitrary<Variant> = (ArbitraryVariantValue as jsc.Arbitrary<VariantValue>).smap<Variant>(v => { return { variantId: v.variantId, constructor: v.constructor, value: v.value } }, v => { return Object.assign({ valueType: 'variant'}, v); });
