// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';
import {GetLedgerConfigurationResponse} from "../../src/model/GetLedgerConfigurationResponse";
import {ArbitraryLedgerConfiguration} from "./ArbitraryLedgerConfiguration";

export const ArbitraryGetLedgerConfigurationResponse: jsc.Arbitrary<GetLedgerConfigurationResponse> = ArbitraryLedgerConfiguration.smap<GetLedgerConfigurationResponse>(
    config => ({
        config: config
    }),
    request => request.config
);
