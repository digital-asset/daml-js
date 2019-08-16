// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Example:
 *
 * ```
 * {
 *   party: 'alice',
 *   displayName: 'Alice',
 *   isLocal: false
 * }
 * ```
 */
export interface PartyDetails {

    /**
     * The stable unique identifier of a DAML party.
     * Must be a valid party identifier.
     * Required
     */
    party: string

    /**
     * Human readable name associated with the party. Caution, it might not be unique.
     * Optional
     */
    displayName?: string

    /**
     * true if party is hosted by the backing participant.
     * Required
     */
    isLocal: boolean
  }
  