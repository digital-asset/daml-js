// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {HashFunctionValidation} from "./HashFunctionValidation";
import {GetPackageResponse} from "../model/GetPackageResponse";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {native} from "./Native";
import {object} from "./Object";

function required(): RequiredFieldsValidators<GetPackageResponse> {
    return {
        archivePayload: native('string'),
        hash: native('string'),
        hashFunction: HashFunctionValidation
    };
}

export const GetPackageResponseValidation = object<GetPackageResponse>('GetPackageResponse', required, noFields);
