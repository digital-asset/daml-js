// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {InclusiveFilters} from "../model/InclusiveFilters";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {array} from "./Array";
import {IdentifierValidation} from "./IdentifierValidation";
import {object} from "./Object";

function required(): RequiredFieldsValidators<InclusiveFilters> {
    return {
        templateIds: array(IdentifierValidation),
    };
}

export const InclusiveFiltersValidation = object<InclusiveFilters>('InclusiveFilters', required, noFields);
