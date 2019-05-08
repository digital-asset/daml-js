// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ResetRequest} from "../generated/com/digitalasset/ledger/api/v1/testing/reset_service_pb";
import {Callback, justForward} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {IResetServiceClient} from "../generated/com/digitalasset/ledger/api/v1/testing/reset_service_grpc_pb";

export class ResetClient {

    private readonly request: ResetRequest;
    private readonly client: IResetServiceClient;

    constructor(ledgerId: string, client: IResetServiceClient) {
        this.client = client;
        this.request = new ResetRequest();
        this.request.setLedgerId(ledgerId);
    }

    reset(callback: Callback<null>) {
        return ClientCancellableCall.accept(this.client.reset(this.request, (error, _) => {
            justForward(callback, error, null)
        }));
    }

}