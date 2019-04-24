// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {
    List as PbList,
    Optional as PbOptional,
    Value as PbValue
} from '../generated/com/digitalasset/ledger/api/v1/value_pb';
import {Empty as PbEmpty} from 'google-protobuf/google/protobuf/empty_pb';

import {Codec} from "./Codec";
import {Value} from "../model/Value";
import {RecordCodec} from "./RecordCodec";
import {VariantCodec} from "./VariantCodec";

export const ValueCodec: Codec<PbValue, Value> = {
    deserialize(value: PbValue): Value {
        if (value.hasBool()) {
            return {kind: 'bool', bool: value.getBool()};
        } else if (value.hasContractId()) {
            return {kind: 'contractId', contractId: value.getContractId()};
        } else if (value.hasDate()) {
            return {kind: 'date', date: '' + value.getDate()};
        } else if (value.hasDecimal()) {
            return {kind: 'decimal', decimal: value.getDecimal()};
        } else if (value.hasInt64()) {
            return {kind: 'int64', int64: value.getInt64()};
        } else if (value.hasList()) {
            const values: Value[] = [];
            if (value.hasList()) {
                value.getList()!.getElementsList().forEach(v => {
                    values.push(ValueCodec.deserialize(v));
                });
            }
            return {kind: 'list', list: values};
        } else if (value.hasParty()) {
            return {kind: 'party', party: value.getParty()};
        } else if (value.hasRecord()) {
            return {kind: 'record', record: RecordCodec.deserialize(value.getRecord()!)};
        } else if (value.hasText()) {
            return {kind: 'text', text: value.getText()};
        } else if (value.hasTimestamp()) {
            return {kind: 'timestamp', timestamp: value.getTimestamp()};
        } else if (value.hasUnit()) {
            return {kind: 'unit'};
        } else if (value.hasVariant()) {
            return {kind: 'variant', variant: VariantCodec.deserialize(value.getVariant()!)};
        } else if (value.hasOptional()) {
            const optional = value.getOptional();
            if (optional!.hasValue()) {
                return {kind: 'optional', optional: ValueCodec.deserialize(optional!.getValue()!)};
            } else {
                return {kind: 'optional'};
            }
        } else {
            throw new Error('Deserialization error, unable to discriminate value type - this is likely to be a bug');
        }
    },
    serialize(object: Value): PbValue {
        const message = new PbValue();
        switch (object.kind) {
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
                message.setDecimal(object.decimal)
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
                message.setRecord(RecordCodec.serialize(object.record));
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
                message.setVariant(VariantCodec.serialize(object.variant));
                break;
        }
        return message;
    }
};