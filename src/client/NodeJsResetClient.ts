// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ResetRequest} from "../generated/com/digitalasset/ledger/api/v1/testing/reset_service_pb";
import {Callback, forwardVoidResponse, promisify} from "../util/Callback";
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

    private resetCallback(callback: Callback<void>) {
        return ClientCancellableCall.accept(this.client.reset(this.request, (error, _) => {
            forwardVoidResponse(callback, error);
        }));
    }

    private resetPromise: () => Promise<void> = promisify(this.resetCallback);

    reset(): Promise<void>
    reset(callback: Callback<void>): ClientCancellableCall
    reset(callback?: Callback<void>): ClientCancellableCall | Promise<void> {
        return callback ? this.resetCallback(callback) : this.resetPromise();
    }

}