// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {TimestampValidation} from "./TimestampValidation";
import {TreeEventValidation} from "./TreeEventValidation";
import {record} from "./Record";
import {TransactionTree} from "../model/TransactionTree";
import {OptionalFieldsValidators, RequiredFieldsValidators} from "./Validation";
import {array} from "./Array";
import {native} from "./Native";
import {object} from "./Object";

function required(): RequiredFieldsValidators<TransactionTree> {
    return {
        effectiveAt: TimestampValidation,
        eventsById: record(TreeEventValidation),
        rootEventIds: array(native('string')),
        offset: native('string'),
        transactionId: native('string')
    };
}

function optional(): OptionalFieldsValidators<TransactionTree> {
    return {
        commandId: native('string'),
        workflowId: native('string'),
    };
}

export const TransactionTreeValidation = object<TransactionTree>('TransactionTree', required, optional);
