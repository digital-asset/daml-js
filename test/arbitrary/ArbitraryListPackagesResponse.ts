// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {ListPackagesResponse} from "../../src/model/ListPackagesResponse";

export const ArbitraryListPackagesResponse: jsc.Arbitrary<ListPackagesResponse> = jsc.array(jsc.string).smap<ListPackagesResponse>(
    packageIds => ({
        packageIds: packageIds
    }),
    request => request.packageIds
);
