// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

export type LedgerOffset = LedgerOffsetBoundary | LedgerOffsetAbsolute;

export enum LedgerOffsetBoundaryValue {
    BEGIN,
    END
}

export interface LedgerOffsetBoundary {
    __type__: 'boundary'
    boundary: LedgerOffsetBoundaryValue
}

export interface LedgerOffsetAbsolute {
    __type__: 'absolute',
    absolute: string
}