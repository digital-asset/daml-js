// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {GetActiveContractsRequest} from "../model/GetActiveContractsRequest";
import {TransactionFilterCodec} from "./TransactionFilterCodec";

import {GetActiveContractsRequest as PbGetActiveContractsRequest} from "../generated/com/digitalasset/ledger/api/v1/active_contracts_service_pb";

export const GetActiveContractsRequestCodec: Codec<PbGetActiveContractsRequest, GetActiveContractsRequest> = {
    deserialize(message: PbGetActiveContractsRequest): GetActiveContractsRequest {
        const object: GetActiveContractsRequest = {
            filter: TransactionFilterCodec.deserialize(message.getFilter()!)
        };
        const verbose = message.getVerbose();
        if (verbose !== undefined) {
            object.verbose = verbose;
        }
        return object;
    },
    serialize(object: GetActiveContractsRequest): PbGetActiveContractsRequest {
        const result = new PbGetActiveContractsRequest();
        if (object.verbose) {
            result.setVerbose(object.verbose);
        }
        result.setFilter(TransactionFilterCodec.serialize(object.filter));
        return result;
    }
};