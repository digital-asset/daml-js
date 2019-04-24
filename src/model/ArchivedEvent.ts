// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {Identifier} from './Identifier';

export interface ArchivedEvent {
    kind: 'archived'
    contractId: string
    eventId: string
    templateId: Identifier
    witnessParties: string[]
}