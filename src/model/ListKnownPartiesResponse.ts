// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { PartyDetails } from "./PartyDetails";

/**
 * Example:
 *
 * ```
 * {
 *     partyDetails: [
 *         {
 *             party: 'alice',
 *             displayName: 'Alice',
 *             isLocal: false
 *         },
 *         {
 *             party: 'bob',
 *             isLocal: false
 *         }
 *     ]
 * }
 * ```
 */
export interface ListKnownPartiesResponse {

    /**
     * The details of all DAML parties hosted by the participant. Required
     */
    partyDetails: Array<PartyDetails>
}
