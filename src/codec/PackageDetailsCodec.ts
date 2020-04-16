// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {PackageDetails} from "../model/PackageDetails";
import {PackageDetails as PbPackageDetails} from "../generated/com/daml/ledger/api/v1/admin/package_management_service_pb";
import {TimestampCodec} from "./TimestampCodec";

export const PackageDetailsCodec: Codec<PbPackageDetails, PackageDetails> = {
    deserialize(message: PbPackageDetails): PackageDetails {
        const object:PackageDetails = {
            packageId: message.getPackageId(),
            packageSize: message.getPackageSize(),
            sourceDescription: message.getSourceDescription()
        };
        if (message.hasKnownSince()) {
            object.knownSince = TimestampCodec.deserialize(message.getKnownSince()!);
        }
        return object;
    },
    serialize(object: PackageDetails): PbPackageDetails {
        const message = new PbPackageDetails();
        message.setPackageId(object.packageId);
        message.setPackageSize(object.packageSize);
        if (object.knownSince !== undefined) {
            message.setKnownSince(TimestampCodec.serialize(object.knownSince));
        }
        message.setSourceDescription(object.sourceDescription);
        return message;
    }
};