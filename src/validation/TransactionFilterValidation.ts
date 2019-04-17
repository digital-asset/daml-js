// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {record} from "./Record";
import {TransactionFilter} from "../model/TransactionFilter";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {FiltersValidation} from "./FiltersValidation";
import {object} from "./Object";

function required(): RequiredFieldsValidators<TransactionFilter> {
    return {
        filtersByParty: record(FiltersValidation)
    };
}

export const TransactionFilterValidation = object<TransactionFilter>('TransactionFilter', required, noFields);
