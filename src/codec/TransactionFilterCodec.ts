// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {TransactionFilter} from "../model/TransactionFilter";
import {Filters} from "../model/Filters";
import {FiltersCodec} from "./FiltersCodec";
import {TransactionFilter as PbTransactionFilter} from "../generated/com/daml/ledger/api/v1/transaction_filter_pb";

export const TransactionFilterCodec: Codec<PbTransactionFilter, TransactionFilter> = {
    deserialize(transactionFilter: PbTransactionFilter): TransactionFilter {
        let filtersByParty: { [k: string]: Filters } = {};
        transactionFilter.getFiltersByPartyMap().forEach((filters, party) => {
            filtersByParty[party] = FiltersCodec.deserialize(filters);
        });
        return {filtersByParty: filtersByParty};
    },
    serialize(transactionFilter: TransactionFilter): PbTransactionFilter {
        const result = new PbTransactionFilter();
        const map = result.getFiltersByPartyMap();
        Object.keys(transactionFilter.filtersByParty).forEach((party) => {
            map.set(party, FiltersCodec.serialize(transactionFilter.filtersByParty[party]));
        });
        return result;
    }
};