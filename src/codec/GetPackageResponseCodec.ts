// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {GetPackageResponse} from "../model/GetPackageResponse";
import {HashFunction} from "../model/HashFunction";
import {GetPackageResponse as PbGetPackageResponse} from "../generated/com/digitalasset/ledger/api/v1/package_service_pb";

export const GetPackageResponseCodec: Codec<PbGetPackageResponse, GetPackageResponse> = {
    deserialize(response: PbGetPackageResponse): GetPackageResponse {
        return {
            hash: response.getHash(),
            hashFunction: HashFunction.SHA256,
            archivePayload: response.getArchivePayload_asB64()
        }
    },
    serialize(response: GetPackageResponse): PbGetPackageResponse {
        const result = new PbGetPackageResponse();
        result.setHash(response.hash);
        result.setHashFunction(response.hashFunction);
        result.setArchivePayload(response.archivePayload);
        return result;
    }
};