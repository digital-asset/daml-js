// Copyright (c) 2019 The DAML Authors. All rights reserved.
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
