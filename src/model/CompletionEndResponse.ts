// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {LedgerOffset} from "./LedgerOffset";

/**
 * Example:
 *
 * ```
 * {
 *     offset: {
 *         offsetType: 'absolute',
 *         absolute: '42'
 *     }
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see LedgerOffset
 */
export interface CompletionEndResponse {

    /**
     * This offset can be used in a CompletionStreamRequest message.
     */
    offset: LedgerOffset

}