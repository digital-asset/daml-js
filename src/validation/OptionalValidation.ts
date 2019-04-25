// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {ValueValidation} from "./ValueValidation";
import {Optional} from "../model/Optional";
import {object} from "./Object";
import {noFields, OptionalFieldsValidators} from "./Validation";

function optional(): OptionalFieldsValidators<Optional> {
    return {
        value: ValueValidation
    };
}

export const OptionalValidation = object<Optional>('Optional', noFields, optional);
