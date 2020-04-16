// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {Filters} from "../model/Filters";
import {InclusiveFiltersCodec} from "./InclusiveFiltersCodec";

import {Filters as PbFilters} from "../generated/com/daml/ledger/api/v1/transaction_filter_pb";

export const FiltersCodec: Codec<PbFilters, Filters> = {
    deserialize(filters: PbFilters): Filters {
        let result: Filters = {};
        if (filters.hasInclusive()) {
            result.inclusive = InclusiveFiltersCodec.deserialize(filters.getInclusive()!);
        }
        return result;
    },
    serialize(filter: Filters): PbFilters {
        const result = new PbFilters();
        if (filter.inclusive) {
            result.setInclusive(InclusiveFiltersCodec.serialize(filter.inclusive));
        }
        return result;
    }
};