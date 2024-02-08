// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {AnyValidation} from "./AnyValidation";
import {Status} from "../model/Status";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {native} from "./Native";
import {array} from "./Array";
import {object} from "./Object";

function required(): RequiredFieldsValidators<Status> {
    return {
        code: native('number'),
        details: array(AnyValidation),
        message: native('string')
    };
}

export const StatusValidation = object<Status>('Status', required, noFields);
