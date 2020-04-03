// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {PackageStatus} from "../model/PackageStatus";
import {PackageStatus as PbPackageStatus} from "../generated/com/digitalasset/ledger/api/v1/package_service_pb";

export const PackageStatusCodec: Codec<PbPackageStatus, PackageStatus> = {
    deserialize(status: PbPackageStatus): PackageStatus {
        if (status === PbPackageStatus.REGISTERED) {
            return PackageStatus.REGISTERED;
        } else if (status === PbPackageStatus.UNKNOWN) {
            return PackageStatus.UNKNOWN;
        } else {
            throw new Error(`Unknown PackageStatus ${status}`);
        }
    },
    serialize(status: PackageStatus): PbPackageStatus {
        if (status === PackageStatus.REGISTERED) {
            return PbPackageStatus.REGISTERED;
        } else if (status === PackageStatus.UNKNOWN) {
            return PbPackageStatus.UNKNOWN;
        } else {
            throw new Error(`Unknown PackageStatus ${status}`);

        }
    }
};