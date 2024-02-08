// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {AllocatePartyRequest} from "../../src/model/AllocatePartyRequest";
import {maybe} from "./Maybe";

export const ArbitraryAllocatePartyRequest: jsc.Arbitrary<AllocatePartyRequest> = jsc.record<AllocatePartyRequest>({
    partyIdHint: maybe(jsc.string),
    displayName: maybe(jsc.string)
});