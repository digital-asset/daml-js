// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Checkpoint} from "./Checkpoint";
import {Completion} from "./Completion";

export interface CompletionStreamResponse {
    checkpoint?: Checkpoint
    completions?: Completion[]
}