// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {
    List as PbList,
    Optional as PbOptional,
    Map as PbMap,
    Value as PbValue,
    Enum as PbEnum
} from '../generated/com/daml/ledger/api/v1/value_pb';
import {Empty as PbEmpty} from 'google-protobuf/google/protobuf/empty_pb';

import {Codec} from "./Codec";
import {EnumValue, MapValue, RecordValue, Value, VariantValue} from "../model/Value";
import {RecordCodec} from "./RecordCodec";
import {VariantCodec} from "./VariantCodec";
import {ErrorMessages} from "../util/ErrorMessages";
import {IdentifierCodec} from "./IdentifierCodec";

export const ValueCodec: Codec<PbValue, Value> = {
    deserialize(value: PbValue): Value {
        if (value.hasBool()) {
            return {valueType: 'bool', bool: value.getBool()};
        } else if (value.hasContractId()) {
            return {valueType: 'contractId', contractId: value.getContractId()};
        } else if (value.hasDate()) {
            return {valueType: 'date', date: '' + value.getDate()};
        } else if (value.hasEnum()) {
            const damlEnum = value.getEnum()!;
            const result: EnumValue = {
                valueType: 'enum',
                constructor: damlEnum.getConstructor()
            };
            if (damlEnum.hasEnumId()) {
                result.enumId = IdentifierCodec.deserialize(damlEnum.getEnumId()!);
            }
            return result;
        } else if (value.hasNumeric()) {
            return {valueType: 'decimal', decimal: value.getNumeric()};
        } else if (value.hasInt64()) {
            return {valueType: 'int64', int64: value.getInt64()};
        } else if (value.hasList()) {
            const values: Value[] = [];
            if (value.hasList()) {
                value.getList()!.getElementsList().forEach(v => {
                    values.push(ValueCodec.deserialize(v));
                });
            }
            return {valueType: 'list', list: values};
        } else if (value.hasParty()) {
            return {valueType: 'party', party: value.getParty()};
        } else if (value.hasRecord()) {
            const record = RecordCodec.deserialize(value.getRecord()!);
            const splatted: RecordValue = {
                valueType: 'record',
                fields: record.fields
            };
            if (record.recordId) {
                splatted.recordId = record.recordId;
            }
            return splatted;
        } else if (value.hasText()) {
            return {valueType: 'text', text: value.getText()};
        } else if (value.hasTimestamp()) {
            return {valueType: 'timestamp', timestamp: value.getTimestamp()};
        } else if (value.hasUnit()) {
            return {valueType: 'unit'};
        } else if (value.hasVariant()) {
            const variant = VariantCodec.deserialize(value.getVariant()!);
            const splatted: VariantValue = {
                valueType: "variant",
                constructor: variant.constructor,
                value: variant.value
            };
            if (variant.variantId) {
                splatted.variantId = variant.variantId;
            }
            return splatted;
        } else if (value.hasOptional()) {
            const optional = value.getOptional();
            if (optional!.hasValue()) {
                return {valueType: 'optional', optional: ValueCodec.deserialize(optional!.getValue()!)};
            } else {
                return {valueType: 'optional'};
            }
        } else if (value.hasMap()) {
            const map = value.getMap()!;
            const object: MapValue = {
                valueType: 'map',
                map: {}
            };
            for (const key of map.getEntriesList()) {
                object.map[key.getKey()] = ValueCodec.deserialize(key.getValue()!);
            }
            return object;
        } else {
            throw new Error(ErrorMessages.unknownDeserialization('Value'));
        }
    },
    serialize(object: Value): PbValue {
        const message = new PbValue();
        switch (object.valueType) {
            case "bool":
                message.setBool(object.bool);
                break;
            case "contractId":
                message.setContractId(object.contractId);
                break;
            case "date":
                message.setDate(parseInt(object.date));
                break;
            case "decimal":
                message.setNumeric(object.decimal);
                break;
            case "enum":
                const pbEnum: PbEnum = new PbEnum();
                pbEnum.setConstructor(object.constructor);
                if (object.enumId !== undefined) {
                    pbEnum.setEnumId(IdentifierCodec.serialize(object.enumId));
                }
                message.setEnum(pbEnum);
                break;
            case "int64":
                message.setInt64(object.int64);
                break;
            case "list":
                const list = new PbList();
                const values: PbValue[] = [];
                for (const v of object.list) {
                    values.push(ValueCodec.serialize(v));
                }
                list.setElementsList(values);
                message.setList(list);
                break;
            case "map":
                const map = new PbMap();
                const entries: PbMap.Entry[] = [];
                for (const key in object.map) {
                    const entry = new PbMap.Entry();
                    entry.setKey(key);
                    entry.setValue(ValueCodec.serialize(object.map[key]));
                    entries.push(entry);
                }
                map.setEntriesList(entries);
                message.setMap(map);
                break;
            case "optional":
                const optional = new PbOptional();
                if (object.optional) {
                    optional.setValue(ValueCodec.serialize(object.optional));
                }
                message.setOptional(optional);
                break;
            case "party":
                message.setParty(object.party);
                break;
            case "record":
                message.setRecord(RecordCodec.serialize(object));
                break;
            case "text":
                message.setText(object.text);
                break;
            case "timestamp":
                message.setTimestamp(object.timestamp);
                break;
            case "unit":
                message.setUnit(new PbEmpty());
                break;
            case "variant":
                message.setVariant(VariantCodec.serialize(object));
                break;
        }
        return message;
    }
};