// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {CreatedEventValidation} from "./CreatedEventValidation";
import {GetActiveContractsResponse} from "../model/GetActiveContractsResponse";
import {OptionalFieldsValidators, RequiredFieldsValidators} from "./Validation";
import {array} from "./Array";
import {native} from "./Native";
import {object} from "./Object";

function required(): RequiredFieldsValidators<GetActiveContractsResponse> {
    return {
        offset: native('string')
    };
}

function optional(): OptionalFieldsValidators<GetActiveContractsResponse> {
    return {
        activeContracts: array(CreatedEventValidation),
        workflowId: native('string')
    }
}

export const GetActiveContractsResponseValidation = object<GetActiveContractsResponse>('GetActiveContractsResponse', required, optional);
