// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {Filters} from "../model/Filters";
import {noFields, OptionalFieldsValidators} from "./Validation";
import {InclusiveFiltersValidation} from "./InclusiveFiltersValidation";
import {object} from "./Object";

function optional(): OptionalFieldsValidators<Filters> {
    return {
        inclusive: InclusiveFiltersValidation
    };
}

export const FiltersValidation = object<Filters>('Filters', noFields, optional);
