// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {Duration} from "./Duration";

export interface LedgerConfiguration {
    maxTtl: Duration
    minTtl: Duration
}