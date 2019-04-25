// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryIdentifier} from './ArbitraryIdentifier';
import {maybe} from './Maybe';
import {ArbitraryEmpty} from './ArbitraryEmpty';
import {Record as LedgerRecord} from "../../src/model/Record";
import {Value} from "../../src/model/Value";
import {Variant} from "../../src/model/Variant";
import {Empty} from "../../src/model/Empty";

declare module 'jsverify' {
    function letrec<K extends string, V>(
        tie: (mapping: (key: K) => jsc.Arbitrary<V>) => Record<K, jsc.Arbitrary<V>>
    ): Record<K, jsc.Arbitrary<V>>;
}

const BoolValue: jsc.Arbitrary<Value> = jsc.bool.smap<{
    bool?: boolean;
}>(boolean => ({bool: boolean}), value => value.bool!);
const ContractIdValue: jsc.Arbitrary<Value> = jsc.string.smap<{
    contractId?: string;
}>(string => ({contractId: string}), value => value.contractId!);
const DateValue: jsc.Arbitrary<Value> = jsc.string.smap<{
    date?: string;
}>(number => ({date: number}), value => value.date!);
const DecimalValue: jsc.Arbitrary<Value> = jsc.string.smap<{
    decimal?: string;
}>(string => ({decimal: string}), value => value.decimal!);
const Int64Value: jsc.Arbitrary<Value> = jsc.string.smap<{
    int64?: string;
}>(number => ({int64: number}), value => value.int64!);
const PartyValue: jsc.Arbitrary<Value> = jsc.string.smap<{
    party?: string;
}>(string => ({party: string}), value => value.party!);
const TextValue: jsc.Arbitrary<Value> = jsc.string.smap<{
    text?: string;
}>(string => ({text: string}), value => value.text!);
const TimestampValue: jsc.Arbitrary<Value> = jsc.string.smap<{
    timestamp?: string;
}>(string => ({timestamp: string}), value => value.timestamp!);
const UnitValue: jsc.Arbitrary<Value> = ArbitraryEmpty.smap<{
    unit?: Empty;
}>(empty => ({unit: empty}), value => value.unit!);

const {
    Record: record,
    Value: value,
    Variant: variant
}: {
    [key: string]: jsc.Arbitrary<LedgerRecord | Value | Variant>;
} = jsc.letrec<string, LedgerRecord | Value | Variant>(tie => ({
    ListValue: jsc
        .array(tie('Value') as jsc.Arbitrary<Value>)
        .smap<LedgerRecord | Value | Variant>(
            list => ({list: list}),
            value => (value as Value).list!
        ),
    Record: jsc
        .pair(
            maybe(ArbitraryIdentifier),
            jsc.dict(tie('Value') as jsc.Arbitrary<Value>)
        )
        .smap<LedgerRecord | Value | Variant>(
            ([recordId, fields]) => {
                const record: LedgerRecord = {
                    fields: fields
                };
                if (recordId) {
                    record.recordId = recordId;
                }
                return record;
            },
            record => {
                return [
                    (record as LedgerRecord).recordId,
                    (record as LedgerRecord).fields
                ];
            }
        ),
    RecordValue: (tie('Record') as jsc.Arbitrary<LedgerRecord>).smap<LedgerRecord | Value | Variant>(record => ({record: record}), value => (value as Value).record!),
    VariantValue: (tie('Variant') as jsc.Arbitrary<Variant>).smap<LedgerRecord | Value | Variant>(
        variant => ({variant: variant}),
        value => (value as Value).variant!
    ),
    Value: jsc.oneof([
        BoolValue,
        ContractIdValue,
        DateValue,
        DecimalValue,
        Int64Value,
        tie('ListValue') as jsc.Arbitrary<Value>,
        PartyValue,
        tie('RecordValue') as jsc.Arbitrary<Value>,
        TextValue,
        TimestampValue,
        UnitValue,
        tie('VariantValue') as jsc.Arbitrary<Value>
    ]) as jsc.Arbitrary<LedgerRecord | Value | Variant>,
    Variant: jsc
        .tuple([
            jsc.string,
            tie('Value') as jsc.Arbitrary<Value>,
            maybe(ArbitraryIdentifier)
        ])
        .smap<LedgerRecord | Value | Variant>(
            ([constructor, value, variantId]) => {
                const variant: Variant = {
                    constructor: constructor,
                    value: value
                };
                if (variantId) {
                    variant.variantId = variantId;
                }
                return variant;
            },
            variant => {
                return [
                    (variant as Variant).constructor,
                    (variant as Variant).value,
                    (variant as Variant).variantId
                ];
            }
        )
}));

export const ArbitraryRecord = record as jsc.Arbitrary<LedgerRecord>;
export const ArbitraryValue = value as jsc.Arbitrary<Value>;
export const ArbitraryVariant = variant as jsc.Arbitrary<Variant>;
