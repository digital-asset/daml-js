// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Timestamp} from "../model/Timestamp";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {native} from "./Native";
import {object} from "./Object";

function required(): RequiredFieldsValidators<Timestamp> {
    return {
        nanoseconds: native('number'),
        seconds: native('number')
    };
}

export const TimestampValidation = object<Timestamp>('Timestamp', required, noFields);
