// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {UploadDarFileRequest} from "../model/UploadDarFileRequest";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {native} from "./Native";
import {object} from "./Object";

function required(): RequiredFieldsValidators<UploadDarFileRequest> {
    return {
        darFile: native('string')
    };
}

export const UploadDarFileRequestValidation = object<UploadDarFileRequest>('UploadDarFileRequest', required, noFields);
