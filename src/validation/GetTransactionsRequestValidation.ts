// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {GetTransactionsRequest} from "../model/GetTransactionsRequest";
import {OptionalFieldsValidators, RequiredFieldsValidators} from "./Validation";
import {native} from "./Native";
import {LedgerOffsetValidation} from "./LedgerOffsetValidation";
import {TransactionFilterValidation} from "./TransactionFilterValidation";
import {object} from "./Object";

function required(): RequiredFieldsValidators<GetTransactionsRequest> {
    return {
        begin: LedgerOffsetValidation,
        filter: TransactionFilterValidation
    };
}

function optional(): OptionalFieldsValidators<GetTransactionsRequest> {
    return {
        end: LedgerOffsetValidation,
        verbose: native('boolean')
    };
}

export const GetTransactionsRequestValidation = object<GetTransactionsRequest>('GetTransactionsRequest', required, optional);
