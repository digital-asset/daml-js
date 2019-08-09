// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ListKnownPartiesResponse} from "../model/ListKnownPartiesResponse";
import {PartyDetailsValidation} from "./PartyDetailsValidation";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {array} from "./Array";
import {object} from "./Object";

function required(): RequiredFieldsValidators<ListKnownPartiesResponse> {
    return {
        partyDetails: array(PartyDetailsValidation),
    };
}

export const ListKnownPartiesResponseValidation = object<ListKnownPartiesResponse>('ListKnownPartiesResponse', required, noFields);
