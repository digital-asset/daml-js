// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {DurationValidation} from "./DurationValidation";
import {LedgerConfiguration} from "../model/LedgerConfiguration";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {object} from "./Object";

function required(): RequiredFieldsValidators<LedgerConfiguration> {
    return {
        maxTtl: DurationValidation,
        minTtl: DurationValidation
    };
}

export const LedgerConfigurationValidation = object<LedgerConfiguration>('LedgerConfiguration', required, noFields);
