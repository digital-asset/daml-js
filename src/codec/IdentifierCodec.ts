// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Identifier} from "../model/Identifier";
import {Codec} from "./Codec";
import {Identifier as PbIdentifier} from "../generated/com/daml/ledger/api/v1/value_pb";

export const IdentifierCodec: Codec<PbIdentifier, Identifier> = {
    deserialize(identifier: PbIdentifier): Identifier {
        return {
            packageId: identifier.getPackageId(),
            moduleName: identifier.getModuleName(),
            entityName: identifier.getEntityName()
        };
    },
    serialize(identifier: Identifier): PbIdentifier {
        const value = new PbIdentifier();
        value.setPackageId(identifier.packageId);
        value.setModuleName(identifier.moduleName);
        value.setEntityName(identifier.entityName);
        return value;
    }
};