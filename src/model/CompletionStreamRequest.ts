// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {LedgerOffset} from "./LedgerOffset";

/**
 * Example:
 *
 * ```
 * {
 *     applicationId: 'some-app-id',
 *     offset: {
 *         offsetType: 'boundary',
 *         boundary: LedgerOffsetBoundaryValue.BEGIN
 *     },
 *     parties: [ 'Alice', 'Bob' ]
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see LedgerOffset
 */
export interface CompletionStreamRequest {

    /**
     * Only completions of commands submitted with the same application identifier will be visible in the stream.
     */
    applicationId: string

    /**
     * This field indicates the minimum offset for completions. This can be used to resume an earlier completion stream.
     *
     * Optional, if not set the ledger uses the current ledger end offset instead.
     */
    offset?: LedgerOffset

    /**
     * Non-empty list of parties whose data should be included.
     */
    parties: string[]
}