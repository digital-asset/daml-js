// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Identifier} from './Identifier';
import {Value} from "./Value";

export interface Variant {
    variantId?: Identifier
    constructor: string
    value: Value
}