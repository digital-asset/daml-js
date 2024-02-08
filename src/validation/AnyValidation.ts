// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {native} from "./Native";
import {object} from "./Object";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {Any} from "../model/Any";

function required(): RequiredFieldsValidators<Any> {
    return {
        typeUrl: native('string'),
        value: native('string')
    };
}

export const AnyValidation = object<Any>('Any', required, noFields);
