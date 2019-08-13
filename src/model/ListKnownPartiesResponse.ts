// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { PartyDetails } from "./PartyDetails";

export interface ListKnownPartiesResponse {
    partyDetails: Array<PartyDetails>
}
