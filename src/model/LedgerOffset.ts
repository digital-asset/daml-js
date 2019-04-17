// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

export interface LedgerOffset {
    boundary?: LedgerOffset.Boundary
    absolute?: LedgerOffset.Absolute
}

export namespace LedgerOffset {

    /**
     * An enumeration of possible boundaries of a ledger.
     */
    export enum Boundary {
        BEGIN,
        END
    }

    export type Absolute = string

}