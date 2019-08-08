// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {PartyDetails} from "../model/PartyDetails";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {native} from "./Native";
import {object} from "./Object";

function required(): RequiredFieldsValidators<PartyDetails> {
    return {
        party: native('string'),
        display_name: native('string'),
        is_local: native('boolean')
    };
}

export const PartyDetailsValidation = object<PartyDetails>('PartyDetails', required, noFields)