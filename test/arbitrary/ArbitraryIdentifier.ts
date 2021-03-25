// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {Identifier} from "../../src/model/Identifier";

export const ArbitraryIdentifier: jsc.Arbitrary<Identifier> = jsc
    .tuple([jsc.string, jsc.string, jsc.string])
    .smap<Identifier>(
        ([packageId, moduleName, entityName]) => {
            return {
                packageId: packageId,
                moduleName: moduleName,
                entityName: entityName
            };
        },
        identifier => {
            return [
                identifier.packageId,
                identifier.moduleName,
                identifier.entityName
            ];
        }
    );
