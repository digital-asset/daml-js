// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Example:
 *
 * ```
 * {
 *     partyIdHint: 'alice',
 *     displayName: 'Alice'
 * }
 * ```
 */
export interface AllocatePartyRequest {

    /**
     * A hint to the backing participant what party id to allocate.
     *
     * It can be ignored.
     *
     * Must be a valid party identifier.
     *
     * Optional
     */
    partyIdHint?: string

    /**
     * Human readable name of the party to be added to the participant.
     *
     * It doesn't have to be unique.
     *
     * Optional
     */
    displayName?: string

}
