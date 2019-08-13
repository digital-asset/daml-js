// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';

import {ArbitraryIdentifier} from './ArbitraryIdentifier';
import {InclusiveFilters} from "../../src/model/InclusiveFilters";

export const ArbitraryInclusiveFilters: jsc.Arbitrary<InclusiveFilters> = jsc.array(ArbitraryIdentifier).smap<InclusiveFilters>(
    templateIds => {
        return {
            templateIds: templateIds
        };
    },
    inclusiveFilters => {
        return inclusiveFilters.templateIds;
    }
);
