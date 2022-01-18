// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {PartyDetails} from "./PartyDetails";

/**
 * Example:
 *
 * ```
 * {
 *     partyDetails: {
 *         party: 'alice',
 *         displayName: 'Alice',
 *         isLocal: false
 *     }
 * }
 * ```
 */
export interface AllocatePartyResponse {

    partyDetails: PartyDetails

}
