// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';
import {GetActiveContractsResponse} from "../../src/model/GetActiveContractsResponse";
import {maybe} from "./Maybe";
import {ArbitraryCreatedEvent} from "./ArbitraryEvent";
import {ArbitraryLedgerOffset} from "./ArbitraryLedgerOffset";

export const ArbitraryGetActiveContractsResponse: jsc.Arbitrary<GetActiveContractsResponse> = jsc
    .tuple([ArbitraryLedgerOffset, maybe(jsc.string), maybe(jsc.array(ArbitraryCreatedEvent))])
    .smap(
        ([offset, workflowId, activeContracts]) => {
            const request: GetActiveContractsResponse = {
                offset: offset
            };
            if (workflowId) {
                request.workflowId = workflowId;
            }
            if (activeContracts) {
                request.activeContracts = activeContracts;
            }
            return request;
        },
        request => {
            return [request.offset, request.workflowId, request.activeContracts];
        }
    );
