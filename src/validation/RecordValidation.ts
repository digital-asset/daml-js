// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {record} from "./Record";
import {Record} from "../model/Record";
import {IdentifierValidation} from "./IdentifierValidation";
import {OptionalFieldsValidators, RequiredFieldsValidators} from "./Validation";
import {ValueValidation} from "./ValueValidation";
import {object} from "./Object";

function required(): RequiredFieldsValidators<Record> {
    return {
        fields: record(ValueValidation)
    };
}

function optional(): OptionalFieldsValidators<Record> {
    return {
        recordId: IdentifierValidation
    };
}

export const RecordValidation = object<Record>('Record', required, optional);
