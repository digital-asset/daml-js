// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * A callback that will either receive an Error or a valid response,
 * depending on the result of the operation.
 */
export type Callback<A> = (error: Error | null, response?: A) => void

export function justForward<A>(callback: Callback<A>, error: Error | null, response: A): void {
    forward(callback, error, response, (a: A) => a);
}

export function forward<A, B>(callback: Callback<B>, error: Error | null, response: A, process: (_: A) => B): void {
    if (error) {
        callback(error);
    } else {
        callback(null, process(response));
    }
}