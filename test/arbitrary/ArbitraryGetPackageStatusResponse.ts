// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';
import {PackageStatus} from "../../src/model/PackageStatus";
import {GetPackageStatusResponse} from "../../src/model/GetPackageStatusResponse";

export const ArbitraryGetPackageStatusResponse: jsc.Arbitrary<GetPackageStatusResponse> = jsc
    .elements([PackageStatus.REGISTERED, PackageStatus.UNKNOWN])
    .smap<GetPackageStatusResponse>(
        status => ({
            status: status
        }),
        request => request.status
    );
