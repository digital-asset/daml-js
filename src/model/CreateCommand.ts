// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Identifier} from './Identifier';
import {Record} from './Record';

export interface CreateCommand {
    commandType: 'create',
    templateId: Identifier
    arguments: Record
}