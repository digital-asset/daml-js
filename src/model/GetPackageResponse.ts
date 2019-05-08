// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {HashFunction} from "./HashFunction";

export interface GetPackageResponse {
    hashFunction: HashFunction
    hash: string
    archivePayload: string
}