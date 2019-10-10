// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {UploadDarFileResponse} from "../model/UploadDarFileResponse";
import {UploadDarFileResponse as PbUploadDarFileResponse} from "../generated/com/digitalasset/ledger/api/v1/admin/package_management_service_pb"

export const UploadDarFileResponseCodec: Codec<PbUploadDarFileResponse, UploadDarFileResponse> = {
    deserialize(message: PbUploadDarFileResponse): UploadDarFileResponse {
        message
        return {}
    },
    serialize(object:UploadDarFileResponse): PbUploadDarFileResponse {
        object
        return new PbUploadDarFileResponse()
    }
}