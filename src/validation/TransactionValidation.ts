// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {TimestampValidation} from "./TimestampValidation";
import {EventValidation} from "./EventValidation";
import {Transaction} from "../model/Transaction";
import {OptionalFieldsValidators, RequiredFieldsValidators} from "./Validation";
import {array} from "./Array";
import {native} from "./Native";
import {object} from "./Object";

function required(): RequiredFieldsValidators<Transaction> {
    return {
        effectiveAt: TimestampValidation,
        events: array(EventValidation),
        offset: native('string'),
        transactionId: native('string')
    };
}

function optional(): OptionalFieldsValidators<Transaction> {
    return {
        commandId: native('string'),
        workflowId: native('string'),
    };
}

export const TransactionValidation = object<Transaction>('Transaction', required, optional);
