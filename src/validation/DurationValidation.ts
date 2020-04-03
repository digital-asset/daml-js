// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Duration} from "../model/Duration";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {native} from "./Native";
import {object} from "./Object";

function required(): RequiredFieldsValidators<Duration> {
    return {
        nanoseconds: native('number'),
        seconds: native('number')
    };
}

export const DurationValidation = object<Duration>('Duration', required, noFields);
