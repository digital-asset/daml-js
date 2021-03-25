// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {Value} from "../model/Value";
import {Record} from "../model/Record";
import {ValueCodec} from "./ValueCodec";
import {IdentifierCodec} from "./IdentifierCodec";
import {Record as PbRecord, RecordField as PbRecordField} from "../generated/com/daml/ledger/api/v1/value_pb";

export const RecordCodec: Codec<PbRecord, Record> = {
    deserialize(record: PbRecord): Record {
        let fieldIndex = 0; // used for records returned in non-verbose mode
        const fields: { [k: string]: Value } = {};
        record.getFieldsList().forEach((field) => {
            fields[field.getLabel() || fieldIndex++] = ValueCodec.deserialize(field.getValue()!);
        });
        const result: Record = {fields: fields};
        if (record.hasRecordId()) {
            result.recordId = IdentifierCodec.deserialize(record.getRecordId()!);
        }
        return result;
    },
    serialize(record: Record): PbRecord {
        const result = new PbRecord();
        if (record.recordId) {
            result.setRecordId(IdentifierCodec.serialize(record.recordId));
        }
        const list: PbRecordField[] = [];
        Object.keys(record.fields).forEach((label: string) => {
            const value = ValueCodec.serialize(record.fields[label]);
            const field = new PbRecordField();
            field.setLabel(label);
            field.setValue(value);
            list.push(field);
        });
        result.setFieldsList(list);
        return result;
    }
};