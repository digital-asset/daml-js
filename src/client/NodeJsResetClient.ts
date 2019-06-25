// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ResetRequest} from "../generated/com/digitalasset/ledger/api/v1/testing/reset_service_pb";
import {Callback, justForward, promisify} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {IResetServiceClient} from "../generated/com/digitalasset/ledger/api/v1/testing/reset_service_grpc_pb";

export class NodeJsResetClient {

    private readonly request: ResetRequest;
    private readonly client: IResetServiceClient;

    constructor(ledgerId: string, client: IResetServiceClient) {
        this.client = client;
        this.request = new ResetRequest();
        this.request.setLedgerId(ledgerId);
    }

    private resetCallback(callback: Callback<null>) {
        return ClientCancellableCall.accept(this.client.reset(this.request, (error, _) => {
            justForward(callback, error, null)
        }));
    }

    private resetPromise: () => Promise<null> = promisify(this.resetCallback);

    reset(): Promise<null>
    reset(callback: Callback<null>): ClientCancellableCall
    reset(callback?: Callback<null>): ClientCancellableCall | Promise<null> {
        return callback ? this.resetCallback(callback) : this.resetPromise();
    }

}