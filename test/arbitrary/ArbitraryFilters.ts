// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {maybe} from "./Maybe";
import {ArbitraryInclusiveFilters} from "./ArbitraryInclusiveFilters";
import {Filters} from "../../src/model/Filters";

export const ArbitraryFilters: jsc.Arbitrary<Filters> = maybe(
    ArbitraryInclusiveFilters
).smap<Filters>(
    inclusive => {
        return inclusive ? {inclusive: inclusive} : {};
    },
    filters => {
        return filters.inclusive;
    }
);
