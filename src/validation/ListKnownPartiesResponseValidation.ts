// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {CreatedEventValidation} from "./CreatedEventValidation";
import {ListKnownPartiesResponse} from "../model/ListKnownPartiesResponse";
import {OptionalFieldsValidators, RequiredFieldsValidators} from "./Validation";
import {array} from "./Array";
import {native} from "./Native";
import {object} from "./Object";

function required(): RequiredFieldsValidators<ListKnownPartiesResponse> {
    return {
        parties: array()
    };
}

function optional(): OptionalFieldsValidators<ListKnownPartiesResponse> {
    return {
        activeContracts: array(CreatedEventValidation),
        workflowId: native('string')
    }
}

export const ListKnownPartiesResponseValidation = object<ListKnownPartiesResponse>('ListKnownPartiesResponse', required, optional);
