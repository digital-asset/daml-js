// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

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
    __type__: jsc.constant("bool"),
    bool: jsc.bool
}) as jsc.Arbitrary<Value>;

const ArbitraryContractIdValue = jsc.record({
    __type__: jsc.constant("contractId"),
    contractId: jsc.string
}) as jsc.Arbitrary<Value>;

const ArbitraryDateValue = jsc.record({
    __type__: jsc.constant("date"),
    date: jsc.string
}) as jsc.Arbitrary<Value>;

const ArbitraryDecimalValue = jsc.record({
    __type__: jsc.constant("decimal"),
    decimal: jsc.string
}) as jsc.Arbitrary<Value>;

const ArbitraryInt64Value = jsc.record({
    __type__: jsc.constant("int64"),
    int64: jsc.string
}) as jsc.Arbitrary<Value>;

const ArbitraryPartyValue = jsc.record({
    __type__: jsc.constant("party"),
    party: jsc.string
}) as jsc.Arbitrary<Value>;

const ArbitraryTextValue = jsc.record({
    __type__: jsc.constant("text"),
    text: jsc.string
}) as jsc.Arbitrary<Value>;

const ArbitraryTimestampValue = jsc.record({
    __type__: jsc.constant("timestamp"),
    timestamp: jsc.string
}) as jsc.Arbitrary<Value>;

const ArbitraryUnitValue = jsc.constant({
    __type__: "unit"
}) as jsc.Arbitrary<Value>;

const { ArbitraryListValue, ArbitraryRecordValue, ArbitraryVariantValue, ArbitraryValue } =
    jsc.letrec<string, Value>(tie => ({
        ArbitraryListValue: jsc.record({
            __type__: jsc.constant('list'),
            list: jsc.array(tie('ArbitraryValue'))
        }) as jsc.Arbitrary<Value>,
        ArbitraryRecordValue: jsc.record({
            __type__: jsc.constant('record'),
            record: jsc.record<LedgerRecord>({
                recordId: maybe(ArbitraryIdentifier),
                fields: jsc.dict(tie('ArbitraryValue'))
            })
        }) as jsc.Arbitrary<Value>,
        ArbitraryVariantValue: jsc.record({
            __type__: jsc.constant("variant"),
            variant: jsc.record<Variant>({
                constructor: jsc.string,
                variantId: maybe(ArbitraryIdentifier),
                value: tie('ArbitraryValue')
            })
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

export const ArbitraryList: jsc.Arbitrary<Value[]> = (ArbitraryListValue as jsc.Arbitrary<ListValue>).smap(v => v.list, v => { return { __type__: 'list', list: v } });
export const ArbitraryRecord: jsc.Arbitrary<LedgerRecord> = (ArbitraryRecordValue as jsc.Arbitrary<RecordValue>).smap(v => v.record, v => { return { __type__: 'record', record: v} });
export const ArbitraryVariant: jsc.Arbitrary<Variant> = (ArbitraryVariantValue as jsc.Arbitrary<VariantValue>).smap(v => v.variant, v => { return { __type__: 'variant', variant: v} });
