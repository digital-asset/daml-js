// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {Identifier} from "./Identifier";
import {Value} from "./Value";

export interface Record {
    recordId?: Identifier
    /**
     * A plain object of Ledger API values.
     */
    fields: { [k: string]: Value }
}