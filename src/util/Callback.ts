// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * A callback that will either receive an Error or a valid response,
 * depending on the result of the operation.
 */
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {promisify as _promisify} from "util";

export type Callback<A> = (error: Error | null, response?: A) => void

type Call<Request, Response> = (request: Request, callback: Callback<Response>) => ClientCancellableCall

type PromisifiedCall<Request, Response> = (request?: Request) => Promise<Response>

export function promisify<Request, Response>(call: Call<Request, Response>): PromisifiedCall<Request, Response> {
    return _promisify(call) as PromisifiedCall<Request, Response>;
}

export function forwardVoidResponse(callback: Callback<void>, error: Error | null): void {
    forward(callback, error, undefined, () => {});
}

export function forward<A, B>(callback: Callback<B>, error: Error | null, response: A, process: (_: A) => B): void {
    if (error) {
        callback(error);
    } else {
        callback(null, process(response));
    }
}