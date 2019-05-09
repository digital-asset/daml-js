// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {SubmitAndWaitForTransactionIdResponse} from "../model/SubmitAndWaitForTransactionIdResponse";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {object} from "./Object";
import {native} from "./Native";

function required(): RequiredFieldsValidators<SubmitAndWaitForTransactionIdResponse> {
    return {
        transactionId: native('string')
    };
}

export const SubmitAndWaitForTransactionIdResponseValidation = object<SubmitAndWaitForTransactionIdResponse>('SubmitAndWaitForTransactionIdResponse', required, noFields);
