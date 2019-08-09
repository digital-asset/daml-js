// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {TransactionFilterValidation} from "./TransactionFilterValidation";
import {ListKnownPartiesRequest} from "../model/ListKnownPartiesRequest";
import {OptionalFieldsValidators, RequiredFieldsValidators} from "./Validation";
import {native} from "./Native";
import {object} from "./Object";

function required(): RequiredFieldsValidators<ListKnownPartiesRequest> {
    return {
        filter: TransactionFilterValidation,
    };
}

function optional(): OptionalFieldsValidators<ListKnownPartiesRequest> {
    return {
        verbose: native('boolean'),
    }
}

export const ListKnownPartiesRequestValidation = object<ListKnownPartiesRequest>('GetActiveContractsRequest', required, optional);
