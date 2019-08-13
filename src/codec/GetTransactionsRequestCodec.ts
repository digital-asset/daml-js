// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {GetTransactionsRequest} from "../model/GetTransactionsRequest";
import {LedgerOffsetCodec} from "./LedgerOffsetCodec";
import {TransactionFilterCodec} from "./TransactionFilterCodec";
import {GetTransactionsRequest as PbGetTransactionsRequest} from "../generated/com/digitalasset/ledger/api/v1/transaction_service_pb";

export const GetTransactionsRequestCodec: Codec<PbGetTransactionsRequest, GetTransactionsRequest> = {
    deserialize(request: PbGetTransactionsRequest): GetTransactionsRequest {
        const result: GetTransactionsRequest = {
            begin: LedgerOffsetCodec.deserialize(request.getBegin()!),
            filter: TransactionFilterCodec.deserialize(request.getFilter()!)
        };
        if (request.hasEnd()) {
            result.end = LedgerOffsetCodec.deserialize(request.getEnd()!);
        }
        const verbose = request.getVerbose();
        if (verbose !== undefined) {
            result.verbose = verbose;
        }
        return result;
    },
    serialize(request: GetTransactionsRequest): PbGetTransactionsRequest {
        const result = new PbGetTransactionsRequest();
        result.setBegin(LedgerOffsetCodec.serialize(request.begin));
        if (request.end) {
            result.setEnd(LedgerOffsetCodec.serialize(request.end));
        }
        result.setFilter(TransactionFilterCodec.serialize(request.filter));
        if (request.verbose !== undefined) {
            result.setVerbose(request.verbose);
        }
        return result;
    }
};