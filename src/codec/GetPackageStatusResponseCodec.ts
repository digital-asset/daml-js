// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {GetPackageStatusResponse} from "../model/GetPackageStatusResponse";
import {PackageStatusCodec} from "./PackageStatusCodec";
import {GetPackageStatusResponse as PbGetPackageStatusResponse} from "../generated/com/daml/ledger/api/v1/package_service_pb";

export const GetPackageStatusResponseCodec: Codec<PbGetPackageStatusResponse, GetPackageStatusResponse> = {
    deserialize(response: PbGetPackageStatusResponse): GetPackageStatusResponse {
        return {
            status: PackageStatusCodec.deserialize(response.getPackageStatus())
        };
    },
    serialize(response: GetPackageStatusResponse): PbGetPackageStatusResponse {
        const result = new PbGetPackageStatusResponse();
        result.setPackageStatus(PackageStatusCodec.serialize(response.status));
        return result;
    }
};