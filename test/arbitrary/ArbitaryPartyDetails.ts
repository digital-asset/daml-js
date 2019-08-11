// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {PartyDetails} from "../../src/model/PartyDetails";

export const ArbitraryPartyDetails: jsc.Arbitrary<PartyDetails> = jsc
    .tuple([jsc.string, jsc.string, jsc.bool])
    .smap<PartyDetails>(
        ([party, displayName, isLocal]) => {
            if (displayName !== undefined){
                return {
                    party: party,
                    displayName: displayName,
                    isLocal: isLocal
                };
            }else{
                return {
                    party: party,
                    isLocal: isLocal
                }; 
            }
        },
        partyDetails => {
            if (partyDetails.displayName !== undefined){
                return [
                    partyDetails.party,
                    partyDetails.displayName,
                    partyDetails.isLocal
                ];
            }else{
                return [
                    partyDetails.party,
                    "",
                    partyDetails.isLocal
                ];
            }
        }
    );
