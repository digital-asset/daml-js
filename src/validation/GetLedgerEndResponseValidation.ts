// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {LedgerOffsetValidation} from "./LedgerOffsetValidation";
import {GetLedgerEndResponse} from "../model/GetLedgerEndResponse";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {object} from "./Object";

function required(): RequiredFieldsValidators<GetLedgerEndResponse> {
    return {
        offset: LedgerOffsetValidation
    };
}

export const GetLedgerEndResponseValidation = object<GetLedgerEndResponse>('GetLedgerEndResponse', required, noFields);
