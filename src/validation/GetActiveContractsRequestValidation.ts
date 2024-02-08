// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {TransactionFilterValidation} from "./TransactionFilterValidation";
import {GetActiveContractsRequest} from "../model/GetActiveContractsRequest";
import {OptionalFieldsValidators, RequiredFieldsValidators} from "./Validation";
import {native} from "./Native";
import {object} from "./Object";

function required(): RequiredFieldsValidators<GetActiveContractsRequest> {
    return {
        filter: TransactionFilterValidation,
    };
}

function optional(): OptionalFieldsValidators<GetActiveContractsRequest> {
    return {
        verbose: native('boolean'),
    }
}

export const GetActiveContractsRequestValidation = object<GetActiveContractsRequest>('GetActiveContractsRequest', required, optional);
