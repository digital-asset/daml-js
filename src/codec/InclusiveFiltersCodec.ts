// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {InclusiveFilters} from "../model/InclusiveFilters";
import {IdentifierCodec} from "./IdentifierCodec";
import {InclusiveFilters as PbInclusiveFilters} from "../generated/com/daml/ledger/api/v1/transaction_filter_pb";

export const InclusiveFiltersCodec: Codec<PbInclusiveFilters, InclusiveFilters> = {
    deserialize(inclusiveFilters: PbInclusiveFilters): InclusiveFilters {
        return {
            templateIds: inclusiveFilters.getTemplateIdsList().map((id) => IdentifierCodec.deserialize(id))
        }
    },
    serialize(inclusiveFilters: InclusiveFilters): PbInclusiveFilters {
        const result = new PbInclusiveFilters();
        result.setTemplateIdsList(inclusiveFilters.templateIds.map((id) => IdentifierCodec.serialize(id)));
        return result;
    }
};