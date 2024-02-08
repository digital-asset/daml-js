// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Callback} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";

export interface ResetClient {

    reset(): Promise<void>
    reset(callback: Callback<void>): ClientCancellableCall

}