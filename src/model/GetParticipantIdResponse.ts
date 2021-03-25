// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


/**
 * A response model representing the identifier of a participant
 *
 * Example:
 *
 * ```
 * {
 *    participantId: "some-participant-id"
 * }
 * ```
 *
 */
export interface GetParticipantIdResponse {

    /** 
     * Identifier of the participant, which SHOULD be globally unique. 
     * Must be a valid LedgerString
     */
    participantId: string
}
