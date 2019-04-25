// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {GetTransactionResponse} from "../model/GetTransactionResponse";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {object} from "./Object";
import {TransactionTreeValidation} from "./TransactionTreeValidation";

function required(): RequiredFieldsValidators<GetTransactionResponse> {
    return {
        transaction: TransactionTreeValidation,
    };
}

export const GetTransactionResponseValidation = object<GetTransactionResponse>('GetTransactionResponse', required, noFields);
