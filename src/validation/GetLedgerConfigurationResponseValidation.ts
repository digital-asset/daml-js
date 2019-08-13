// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {LedgerConfigurationValidation} from "./LedgerConfigurationValidation";
import {GetLedgerConfigurationResponse} from "../model/GetLedgerConfigurationResponse";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {object} from "./Object";

function required(): RequiredFieldsValidators<GetLedgerConfigurationResponse> {
    return {
        config: LedgerConfigurationValidation
    };
}

export const GetLedgerConfigurationResponseValidation = object<GetLedgerConfigurationResponse>('GetLedgerConfigurationResponse', required, noFields);
