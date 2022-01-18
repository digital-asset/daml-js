// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {TimestampValidation} from "./TimestampValidation";
import {SetTimeRequest} from "../model/SetTimeRequest";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {object} from "./Object";

function required(): RequiredFieldsValidators<SetTimeRequest> {
    return {
        currentTime: TimestampValidation,
        newTime: TimestampValidation,
    };
}

export const SetTimeRequestValidation = object<SetTimeRequest>('SetTimeRequest', required, noFields);
