// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

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
