// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Identifier} from "../model/Identifier";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {native} from "./Native";
import {object} from "./Object";

function required(): RequiredFieldsValidators<Identifier> {
    return {
        packageId: native('string'),
        moduleName: native('string'),
        entityName: native('string')
    };
}

export const IdentifierValidation = object<Identifier>('Identifier', required, noFields);
