// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {
    List as PbList,
    Value as PbValue,
    Variant as PbVariant
} from '../generated/com/digitalasset/ledger/api/v1/value_pb';
import {Empty as PbEmpty} from 'google-protobuf/google/protobuf/empty_pb';

import {inspect} from 'util';
import {Codec} from "./Codec";
import {Value} from "../model/Value";
import {RecordCodec} from "./RecordCodec";
import {Variant} from "../model/Variant";
import {IdentifierCodec} from "./IdentifierCodec";
import {OptionalCodec} from "./OptionalCodec";

export const ValueCodec: Codec<PbValue, Value> = {
    deserialize(value: PbValue): Value {
        if (value.hasBool()) {
            return {bool: value.getBool()}
        } else if (value.hasContractId()) {
            return {contractId: value.getContractId()}
        } else if (value.hasDate()) {
            return {date: '' + value.getDate()}
        } else if (value.hasDecimal()) {
            return {decimal: value.getDecimal()}
        } else if (value.hasInt64()) {
            return {int64: value.getInt64()}
        } else if (value.hasList()) {
            const values: Value[] = [];
            if (value.hasList()) {
                value.getList()!.getElementsList().forEach(v => {
                    values.push(ValueCodec.deserialize(v));
                });
            }
            return {list: values}
        } else if (value.hasParty()) {
            return {party: value.getParty()}
        } else if (value.hasRecord()) {
            return {record: RecordCodec.deserialize(value.getRecord()!)}
        } else if (value.hasText()) {
            return {text: value.getText()}
        } else if (value.hasTimestamp()) {
            return {timestamp: value.getTimestamp()}
        } else if (value.hasUnit()) {
            return {unit: {}}
        } else if (value.hasVariant()) {
            const variant = value.getVariant()!;
            const result: Variant = {
                constructor: variant.getConstructor(),
                value: ValueCodec.deserialize(variant.getValue()!),
            }
            if (variant.hasVariantId()) {
                result.variantId = IdentifierCodec.deserialize(variant.getVariantId()!);
            }
            return {variant: result}
        } else if (value.hasOptional()) {
            return {optional: OptionalCodec.deserialize(value.getOptional()!)}
        } else {
            throw new Error(`Message Value of unknown type '${inspect(value)}'`);
        }
    },
    serialize(value: Value): PbValue {
        const result = new PbValue();
        if (value.bool !== undefined) {
            result.setBool(value.bool);
        } else if (value.contractId !== undefined) {
            result.setContractId(value.contractId);
        } else if (value.date !== undefined) {
            result.setDate(parseInt(value.date));
        } else if (value.decimal !== undefined) {
            result.setDecimal(value.decimal);
        } else if (value.int64 !== undefined) {
            result.setInt64(value.int64);
        } else if (value.list !== undefined) {
            const values: PbValue[] = []
            value.list.forEach(v => values.push(ValueCodec.serialize(v)));
            const list = new PbList();
            list.setElementsList(values);
            result.setList(list);
        } else if (value.party !== undefined) {
            result.setParty(value.party);
        } else if (value.record !== undefined) {
            result.setRecord(RecordCodec.serialize(value.record));
        } else if (value.text !== undefined) {
            result.setText(value.text);
        } else if (value.timestamp !== undefined) {
            result.setTimestamp(value.timestamp);
        } else if (value.unit !== undefined) {
            result.setUnit(new PbEmpty());
        } else if (value.variant !== undefined) {
            const variant = new PbVariant();
            variant.setConstructor(value.variant.constructor);
            variant.setValue(ValueCodec.serialize(value.variant.value));
            if (value.variant.variantId) {
                variant.setVariantId(IdentifierCodec.serialize(value.variant.variantId));
            }
            result.setVariant(variant);
        } else if (value.optional) {
            result.setOptional(OptionalCodec.serialize(value.optional));
        } else {
            throw new Error(`Object Value of unknown type '${inspect(value)}'`);
        }
        return result;
    }
};