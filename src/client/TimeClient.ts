// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {Callback} from "../util/Callback";
import {SetTimeRequest} from "../model/SetTimeRequest";
import {ClientReadableObjectStream} from "../call/ClientReadableObjectStream";
import {GetTimeResponse} from "../model/GetTimeResponse";

/**
 * Optional service, exposed for testing static time scenarios.
 */
export interface TimeClient {

    /**
     * Returns a stream of time updates.
     *
     * Always returns at least one response, where the first one is the current
     * time.
     *
     * Subsequent responses are emitted whenever the ledger server's time is
     * updated.
     */
    getTime(): ClientReadableObjectStream<GetTimeResponse>

    /**
     * Allows clients to change the ledger's clock in an atomic get-and-set
     * operation.
     */
    setTime(requestObject: SetTimeRequest): Promise<void>
    setTime(requestObject: SetTimeRequest, callback: Callback<void>): ClientCancellableCall

}