// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {GetTransactionByEventIdRequest} from "../model/GetTransactionByEventIdRequest";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {native} from "./Native";
import {array} from "./Array";
import {object} from "./Object";

function required(): RequiredFieldsValidators<GetTransactionByEventIdRequest> {
    return {
        eventId: native('string'),
        requestingParties: array(native('string')),
    };
}

export const GetTransactionByEventIdRequestValidation = object<GetTransactionByEventIdRequest>('GetTransactionByEventIdRequest', required, noFields);
