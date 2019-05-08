// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

export interface GetTransactionByEventIdRequest {
    eventId: string
    requestingParties: string[]
}