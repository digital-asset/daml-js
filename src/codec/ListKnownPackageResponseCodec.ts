// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {PackageDetailsCodec} from "../codec/PackageDetailsCodec";
import {ListKnownPackageResponse} from "../model/ListKnownPackageResponse";
import {ListKnownPackagesResponse as PbListKnowPackageResponse, PackageDetails as PbPackageDetails} from "../generated/com/digitalasset/ledger/api/v1/admin/package_management_service_pb";
import { PartyDetailsCodec } from "./PartyDetailsCodec";

export const ListKnownPackageResponseCodec: Codec<PbListKnowPackageResponse, ListKnownPackageResponse> = {
    deserialize(response: PbListKnowPackageResponse): ListKnownPackageResponse {
        
        const packagePbDetailsList: PbPackageDetails[] = response.getPackageDetailsList();
        const packageDetailsList = packagePbDetailsList.map( item => {
            return PackageDetailsCodec.deserialize(item);
        })
        return {
            packageDetailsList: packageDetailsList
        }
    },
    serialize(response: ListKnownPackageResponse): PbListKnowPackageResponse{
        const message = new PbListKnowPackageResponse();
        const pbPackageDetailsList = response.packageDetailsList.map(item => {
            return PartyDetailsCodec.serialize(pbPackageDetailsList)
        });
        message.setPackageDetailsList(pbPackageDetailsList);
        return message;
    }
}