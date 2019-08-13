// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {GetTransactionsResponse} from "../model/GetTransactionsResponse";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {array} from "./Array";
import {TransactionValidation} from "./TransactionValidation";
import {object} from "./Object";

function required(): RequiredFieldsValidators<GetTransactionsResponse> {
    return {
        transactions: array(TransactionValidation),
    };
}

export const GetTransactionsResponseValidation = object<GetTransactionsResponse>('GetTransactionsResponse', required, noFields);
