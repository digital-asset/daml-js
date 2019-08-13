// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {TimestampValidation} from "./TimestampValidation";
import {GetTimeResponse} from "../model/GetTimeResponse";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {object} from "./Object";

function required(): RequiredFieldsValidators<GetTimeResponse> {
    return {
        currentTime: TimestampValidation
    };
}

export const GetTimeResponseValidation = object<GetTimeResponse>('GetTimeResponse', required, noFields);
