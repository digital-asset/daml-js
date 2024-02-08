// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {GetPackageResponse} from "../../src/model/GetPackageResponse";
import {HashFunction} from "../../src/model/HashFunction";

export const ArbitraryGetPackageResponse: jsc.Arbitrary<GetPackageResponse> = jsc
    .tuple([jsc.elements([HashFunction.SHA256]), jsc.string, jsc.string])
    .smap<GetPackageResponse>(
        ([hashFunction, hash, archivePayload]) => {
            return {
                hashFunction: hashFunction,
                hash: hash,
                archivePayload: archivePayload
            };
        },
        request => {
            return [request.hashFunction, request.hash, request.archivePayload];
        }
    );
