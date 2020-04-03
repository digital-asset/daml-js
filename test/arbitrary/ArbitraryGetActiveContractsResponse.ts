// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {GetActiveContractsResponse} from "../../src/model/GetActiveContractsResponse";
import {maybe} from "./Maybe";
import {ArbitraryCreatedEvent} from "./ArbitraryEvent";

export const ArbitraryGetActiveContractsResponse: jsc.Arbitrary<GetActiveContractsResponse> =
    jsc.record<GetActiveContractsResponse>({
        offset: jsc.string,
        activeContracts: maybe(jsc.array(ArbitraryCreatedEvent)),
        workflowId: maybe(jsc.string)
    });
