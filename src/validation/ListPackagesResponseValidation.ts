// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {ListPackagesResponse} from "../model/ListPackagesResponse";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {array} from "./Array";
import {native} from "./Native";
import {object} from "./Object";

function required(): RequiredFieldsValidators<ListPackagesResponse> {
    return {
        packageIds: array(native('string'))
    };
}

export const ListPackagesResponseValidation = object<ListPackagesResponse>('ListPackagesResponse', required, noFields);
