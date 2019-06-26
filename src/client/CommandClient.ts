// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Callback} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {SubmitAndWaitRequest} from "../model/SubmitAndWaitRequest";
import {SubmitAndWaitForTransactionResponse} from "../model/SubmitAndWaitForTransactionResponse";
import {SubmitAndWaitForTransactionIdResponse} from "../model/SubmitAndWaitForTransactionIdResponse";
import {SubmitAndWaitForTransactionTreeResponse} from "../model/SubmitAndWaitForTransactionTreeResponse";

/**
 * Command Service is able to correlate submitted commands with completion
 * ledger, identify timeouts, and return contextual information with each
 * tracking result. This supports the implementation of stateless clients.
 */
export interface CommandClient {

    /**
     * Submits a single composite command and waits for its result.
     *
     * Returns RESOURCE_EXHAUSTED if the number of in-flight commands reached
     * the maximum (if a limit is configured).
     *
     * Propagates the gRPC error of failed submissions including DAML
     * interpretation errors.
     */
    submitAndWait(requestObject: SubmitAndWaitRequest): Promise<void>
    submitAndWait(requestObject: SubmitAndWaitRequest, callback: Callback<void>): ClientCancellableCall

    /**
     * Submits a single composite command, waits for its result, and returns the transaction.
     *
     * Returns ``RESOURCE_EXHAUSTED`` if the number of in-flight commands reached the maximum (if a limit is configured).
     *
     * Propagates the gRPC error of failed submissions including DAML interpretation errors.
     */
    submitAndWaitForTransaction(requestObject: SubmitAndWaitRequest): Promise<SubmitAndWaitForTransactionResponse>
    submitAndWaitForTransaction(requestObject: SubmitAndWaitRequest, callback: Callback<SubmitAndWaitForTransactionResponse>): ClientCancellableCall

    /**
     * Submits a single composite command, waits for its result, and returns the transaction id.
     *
     * Returns ``RESOURCE_EXHAUSTED`` if the number of in-flight commands reached the maximum (if a limit is configured).
     *
     * Propagates the gRPC error of failed submissions including DAML interpretation errors.
     */
    submitAndWaitForTransactionId(requestObject: SubmitAndWaitRequest): Promise<SubmitAndWaitForTransactionIdResponse>
    submitAndWaitForTransactionId(requestObject: SubmitAndWaitRequest, callback: Callback<SubmitAndWaitForTransactionIdResponse>): ClientCancellableCall

    /**
     * Submits a single composite command, waits for its result, and returns the transaction tree.
     *
     * Returns ``RESOURCE_EXHAUSTED`` if the number of in-flight commands reached the maximum (if a limit is configured).
     *
     * Propagates the gRPC error of failed submissions including DAML interpretation errors.
     */
    submitAndWaitForTransactionTree(requestObject: SubmitAndWaitRequest): Promise<SubmitAndWaitForTransactionTreeResponse>
    submitAndWaitForTransactionTree(requestObject: SubmitAndWaitRequest, callback: Callback<SubmitAndWaitForTransactionTreeResponse>): ClientCancellableCall

}