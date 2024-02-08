// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {GetTransactionByIdRequest} from "../model/GetTransactionByIdRequest";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {native} from "./Native";
import {array} from "./Array";
import {object} from "./Object";

function required(): RequiredFieldsValidators<GetTransactionByIdRequest> {
    return {
        transactionId: native('string'),
        requestingParties: array(native('string')),
    };
}

export const GetTransactionByIdRequestValidation = object<GetTransactionByIdRequest>('GetTransactionByIdRequest', required, noFields);
