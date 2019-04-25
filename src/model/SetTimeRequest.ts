// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {Timestamp} from './Timestamp';

export interface SetTimeRequest {
    currentTime: Timestamp
    newTime: Timestamp
}