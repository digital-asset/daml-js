// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {GetActiveContractsResponse} from "../model/GetActiveContractsResponse";
import {CreatedEventCodec} from "./CreatedEventCodec";

import {GetActiveContractsResponse as PbGetActiveContractsResponse} from "../generated/com/digitalasset/ledger/api/v1/active_contracts_service_pb";

export const GetActiveContractsResponseCodec: Codec<PbGetActiveContractsResponse, GetActiveContractsResponse> = {
    deserialize(message: PbGetActiveContractsResponse): GetActiveContractsResponse {
        const result: GetActiveContractsResponse = {
            offset: message.getOffset()!
        };
        const workflowId = message.getWorkflowId();
        if (message.getWorkflowId() !== undefined && message.getWorkflowId() !== '') {
            result.workflowId = workflowId;
        }
        const activeContracts = message.getActiveContractsList();
        if (activeContracts) {
            result.activeContracts = activeContracts.map(event => CreatedEventCodec.deserialize(event));
        }
        return result;
    },
    serialize(object: GetActiveContractsResponse): PbGetActiveContractsResponse {
        const message = new PbGetActiveContractsResponse();
        message.setOffset(object.offset);
        if (object.activeContracts) {
            message.setActiveContractsList(object.activeContracts.map(CreatedEventCodec.serialize));
        }
        if (object.workflowId) {
            message.setWorkflowId(object.workflowId)
        }
        return message;
    }
};