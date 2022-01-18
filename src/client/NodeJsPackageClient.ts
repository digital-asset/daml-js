// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {IPackageServiceClient} from "../generated/com/daml/ledger/api/v1/package_service_grpc_pb";
import {
    GetPackageRequest,
    GetPackageStatusRequest,
    ListPackagesRequest
} from "../generated/com/daml/ledger/api/v1/package_service_pb";
import {Callback, forward, promisify} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {ListPackagesResponseCodec} from "../codec/ListPackagesResponseCodec";
import {ListPackagesResponse} from "../model/ListPackagesResponse";
import {GetPackageResponse} from "../model/GetPackageResponse";
import {GetPackageResponseCodec} from "../codec/GetPackageResponseCodec";
import {GetPackageStatusResponse} from "../model/GetPackageStatusResponse";
import {GetPackageStatusResponseCodec} from "../codec/GetPackageStatusResponseCodec";

export class NodeJsPackageClient {

    private readonly ledgerId: string;
    private readonly listPackagesRequest: ListPackagesRequest;
    private readonly client: IPackageServiceClient;

    constructor(ledgerId: string, client: IPackageServiceClient) {
        this.client = client;
        this.ledgerId = ledgerId;
        this.listPackagesRequest = new ListPackagesRequest();
        this.listPackagesRequest.setLedgerId(this.ledgerId);
    }

    private listPackagesCallback(callback: Callback<ListPackagesResponse>): ClientCancellableCall {
        return ClientCancellableCall.accept(this.client.listPackages(this.listPackagesRequest, (error, response) => {
            forward(callback, error, response, ListPackagesResponseCodec.deserialize);
        }));
    }

    private listPackagesPromise: () => Promise<ListPackagesResponse> = promisify(this.listPackagesCallback);

    listPackages(): Promise<ListPackagesResponse>
    listPackages(callback: Callback<ListPackagesResponse>): ClientCancellableCall
    listPackages(callback?: Callback<ListPackagesResponse>): ClientCancellableCall | Promise<ListPackagesResponse> {
        return callback ? this.listPackagesCallback(callback) : this.listPackagesPromise();
    }

    private getPackageCallback(packageId: string, callback: Callback<GetPackageResponse>): ClientCancellableCall {
        const request = new GetPackageRequest();
        request.setLedgerId(this.ledgerId);
        request.setPackageId(packageId);
        return ClientCancellableCall.accept(this.client.getPackage(request, (error, response) => {
            forward(callback, error, response, GetPackageResponseCodec.deserialize);
        }));
    }

    private getPackagePromise: (packageId: string) => Promise<GetPackageResponse> = promisify(this.getPackageCallback);

    getPackage(packageId: string): Promise<GetPackageResponse>
    getPackage(packageId: string, callback: Callback<GetPackageResponse>): ClientCancellableCall
    getPackage(packageId: string, callback?: Callback<GetPackageResponse>): ClientCancellableCall | Promise<GetPackageResponse> {
        return callback ? this.getPackageCallback(packageId, callback) : this.getPackagePromise(packageId);
    }

    private getPackageStatusCallback(packageId: string, callback: Callback<GetPackageStatusResponse>): ClientCancellableCall {
        const request = new GetPackageStatusRequest();
        request.setLedgerId(this.ledgerId);
        request.setPackageId(packageId);
        return ClientCancellableCall.accept(this.client.getPackageStatus(request, (error, response) => {
            forward(callback, error, response, GetPackageStatusResponseCodec.deserialize);
        }));
    }

    private getPackageStatusPromise: (packageId: string) => Promise<GetPackageStatusResponse> = promisify(this.getPackageStatusCallback);

    getPackageStatus(packageId: string): Promise<GetPackageStatusResponse>
    getPackageStatus(packageId: string, callback: Callback<GetPackageStatusResponse>): ClientCancellableCall
    getPackageStatus(packageId: string, callback?: Callback<GetPackageStatusResponse>): ClientCancellableCall | Promise<GetPackageStatusResponse> {
        return callback ? this.getPackageStatusCallback(packageId, callback) : this.getPackageStatusPromise(packageId);
    }

}
