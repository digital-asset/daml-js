// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {ListPackagesResponse} from "../model/ListPackagesResponse";
import {Codec} from "./Codec";
import {ListPackagesResponse as PbListPackagesResponse} from "../generated/com/digitalasset/ledger/api/v1/package_service_pb";

export const ListPackagesResponseCodec: Codec<PbListPackagesResponse, ListPackagesResponse> = {
    deserialize(response: PbListPackagesResponse): ListPackagesResponse {
        return {
            packageIds: response.getPackageIdsList()
        }
    },
    serialize(response: ListPackagesResponse): PbListPackagesResponse {
        const result = new PbListPackagesResponse();
        result.setPackageIdsList(response.packageIds);
        return result;
    }
};