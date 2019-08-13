// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Checkpoint} from "./Checkpoint";
import {Completion} from "./Completion";

export interface CompletionStreamResponse {

    /**
     * This checkpoint may be used to restart consumption.  The
     * checkpoint is after any completions in this response.
     */
    checkpoint?: Checkpoint

    /**
     * If set, one or more completions.
     */
    completions?: Completion[]
}