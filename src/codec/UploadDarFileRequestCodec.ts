// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {UploadDarFileRequest} from "../model/UploadDarFileRequest";
import {UploadDarFileRequest as PbUploadDarFileRequest} from "../generated/com/daml/ledger/api/v1/admin/package_management_service_pb"

export const UploadDarFileRequestCodec: Codec<PbUploadDarFileRequest, UploadDarFileRequest> = {
    deserialize(message: PbUploadDarFileRequest): UploadDarFileRequest {
        const object: UploadDarFileRequest = {
            darFile: message.getDarFile_asB64()
        };
        return object;
    },
    serialize(object: UploadDarFileRequest): PbUploadDarFileRequest{
        const message = new PbUploadDarFileRequest();
        message.setDarFile(object.darFile);
        return message;
    }
}