// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Any} from "./Any";

export interface Status {
    code: number
    message: string
    details: Any[]
}