// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Any} from "./Any";

export interface Status {
    code: number
    message: string
    details: Any[]
}