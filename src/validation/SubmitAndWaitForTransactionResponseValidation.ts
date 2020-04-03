// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {SubmitAndWaitForTransactionResponse} from "../model/SubmitAndWaitForTransactionResponse";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {object} from "./Object";
import {TransactionValidation} from "./TransactionValidation";

function required(): RequiredFieldsValidators<SubmitAndWaitForTransactionResponse> {
    return {
        transaction: TransactionValidation
    };
}

export const SubmitAndWaitForTransactionResponseValidation = object<SubmitAndWaitForTransactionResponse>('SubmitAndWaitForTransactionResponse', required, noFields);
