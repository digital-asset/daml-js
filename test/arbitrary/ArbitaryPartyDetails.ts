// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {PartyDetails} from "../../src/model/PartyDetails";
import { maybe } from './Maybe';

export const ArbitraryPartyDetails: jsc.Arbitrary<PartyDetails> = 
    jsc.record<PartyDetails>({
        party: jsc.string,
        displayName: maybe(jsc.string),
        isLocal: jsc.bool
    });
    
