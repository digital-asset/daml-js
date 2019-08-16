// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {object} from "./Object";
import {noFields, OptionalFieldsValidators} from "./Validation";
import {AllocatePartyRequest} from "../model/AllocatePartyRequest";
import {native} from "./Native";

function optional(): OptionalFieldsValidators<AllocatePartyRequest> {
    return {
        partyIdHint: native('string'),
        displayName: native('string')
    };
}

export const AllocatePartyRequestValidation = object<AllocatePartyRequest>('AllocatePartyRequest', noFields, optional);
