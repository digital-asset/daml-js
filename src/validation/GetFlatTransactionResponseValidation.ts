// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {GetFlatTransactionResponse} from "../model/GetFlatTransactionResponse";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {object} from "./Object";
import {TransactionValidation} from "./TransactionValidation";

function required(): RequiredFieldsValidators<GetFlatTransactionResponse> {
    return {
        transaction: TransactionValidation,
    };
}

export const GetFlatTransactionResponseValidation = object<GetFlatTransactionResponse>('GetFlatTransactionResponse', required, noFields);
