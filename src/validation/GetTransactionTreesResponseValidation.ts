// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {GetTransactionTreesResponse} from "../model/GetTransactionTreesResponse";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {array} from "./Array";
import {TransactionTreeValidation} from "./TransactionTreeValidation";
import {object} from "./Object";

function required(): RequiredFieldsValidators<GetTransactionTreesResponse> {
    return {
        transactions: array(TransactionTreeValidation),
    };
}

export const GetTransactionTreesResponseValidation = object<GetTransactionTreesResponse>('GetTransactionTreesResponse', required, noFields);
