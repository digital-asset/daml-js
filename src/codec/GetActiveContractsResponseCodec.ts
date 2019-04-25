// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {Codec} from "./Codec";
import {GetActiveContractsResponse} from "../model/GetActiveContractsResponse";
import {CreatedEventCodec} from "./CreatedEventCodec";

import {GetActiveContractsResponse as PbGetActiveContractsResponse} from "../generated/com/digitalasset/ledger/api/v1/active_contracts_service_pb";

export const GetActiveContractsResponseCodec: Codec<PbGetActiveContractsResponse, GetActiveContractsResponse> = {
    deserialize(response: PbGetActiveContractsResponse): GetActiveContractsResponse {
        const result: GetActiveContractsResponse = {
            offset: {absolute: response.getOffset()},
        };
        const workflowId = response.getWorkflowId();
        if (response.getWorkflowId() !== undefined && response.getWorkflowId() !== '') {
            result.workflowId = workflowId;
        }
        const activeContracts = response.getActiveContractsList();
        if (activeContracts) {
            result.activeContracts = activeContracts.map(event => CreatedEventCodec.deserialize(event));
        }
        return result;
    },
    serialize(response: GetActiveContractsResponse): PbGetActiveContractsResponse {
        const result = new PbGetActiveContractsResponse();
        result.setOffset(response.offset.absolute!);
        if (response.activeContracts) {
            result.setActiveContractsList(response.activeContracts.map(CreatedEventCodec.serialize));
        }
        if (response.workflowId) {
            result.setWorkflowId(response.workflowId)
        }
        return result;
    }
};