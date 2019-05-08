// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {PackageStatusValidation} from "./PackageStatusValidation";
import {GetPackageStatusResponse} from "../model/GetPackageStatusResponse";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {object} from "./Object";

function required(): RequiredFieldsValidators<GetPackageStatusResponse> {
    return {
        status: PackageStatusValidation
    };
}

export const GetPackageStatusResponseValidation = object<GetPackageStatusResponse>('GetPackageStatusResponse', required, noFields);
