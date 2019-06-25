// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Callback} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";

export interface ResetClient {

    reset(): Promise<null>
    reset(callback: Callback<null>): ClientCancellableCall

}