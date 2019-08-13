// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {SubmitAndWaitForTransactionTreeResponse} from "../model/SubmitAndWaitForTransactionTreeResponse";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {object} from "./Object";
import {TransactionTreeValidation} from "./TransactionTreeValidation";

function required(): RequiredFieldsValidators<SubmitAndWaitForTransactionTreeResponse> {
    return {
        transaction: TransactionTreeValidation
    };
}

export const SubmitAndWaitForTransactionTreeResponseValidation = object<SubmitAndWaitForTransactionTreeResponse>('SubmitAndWaitForTransactionTreeResponse', required, noFields);
