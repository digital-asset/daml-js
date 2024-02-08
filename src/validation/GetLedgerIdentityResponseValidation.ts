// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {GetLedgerIdentityResponse} from "../model/GetLedgerIdentityResponse";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {native} from "./Native";
import {object} from "./Object";

function required(): RequiredFieldsValidators<GetLedgerIdentityResponse> {
    return {
        ledgerId: native('string')
    };
}

export const GetLedgerIdentityResponseValidation = object<GetLedgerIdentityResponse>('GetLedgerIdentityResponse', required, noFields);
