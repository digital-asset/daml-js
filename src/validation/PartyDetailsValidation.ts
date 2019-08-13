// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {PartyDetails} from "../model/PartyDetails";
import {OptionalFieldsValidators, RequiredFieldsValidators} from "./Validation";
import {native} from "./Native";
import {object} from "./Object";

function required(): RequiredFieldsValidators<PartyDetails> {
    return {
        party: native('string'),
        isLocal: native('boolean')
    };
}

function optional(): OptionalFieldsValidators<PartyDetails> {
    return {
        displayName: native('string')
    }
}

export const PartyDetailsValidation = object<PartyDetails>('PartyDetails', required, optional);