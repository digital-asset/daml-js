// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {IPackageServiceClient} from "../generated/com/digitalasset/ledger/api/v1/package_service_grpc_pb";
import {
    GetPackageRequest,
    GetPackageStatusRequest,
    ListPackagesRequest
} from "../generated/com/digitalasset/ledger/api/v1/package_service_pb";
import {Callback, forward} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {ListPackagesResponseCodec} from "../codec/ListPackagesResponseCodec";
import {ListPackagesResponse} from "../model/ListPackagesResponse";
import {GetPackageResponse} from "../model/GetPackageResponse";
import {GetPackageResponseCodec} from "../codec/GetPackageResponseCodec";
import {GetPackageStatusResponse} from "../model/GetPackageStatusResponse";
import {GetPackageStatusResponseCodec} from "../codec/GetPackageStatusResponseCodec";

/**
 * Allows clients to query the DAML LF packages that are supported by the
 * server.
 */
export class PackageClient {

    private readonly ledgerId: string;
    private readonly listPackagesRequest: ListPackagesRequest;
    private readonly client: IPackageServiceClient;

    constructor(ledgerId: string, client: IPackageServiceClient) {
        this.client = client;
        this.ledgerId = ledgerId;
        this.listPackagesRequest = new ListPackagesRequest();
        this.listPackagesRequest.setLedgerId(this.ledgerId);
    }

    /**
     * Returns the identifiers of all supported packages.
     */
    listPackages(callback: Callback<ListPackagesResponse>): ClientCancellableCall {
        return ClientCancellableCall.accept(this.client.listPackages(this.listPackagesRequest, (error, response) => {
            forward(callback, error, response, ListPackagesResponseCodec.deserialize);
        }));
    }

    /**
     * Returns the contents of a single package, or a NOT_FOUND error if the
     * requested package is unknown.
     */
    getPackage(packageId: string, callback: Callback<GetPackageResponse>): ClientCancellableCall {
        const request = new GetPackageRequest();
        request.setLedgerId(this.ledgerId);
        request.setPackageId(packageId);
        return ClientCancellableCall.accept(this.client.getPackage(request, (error, response) => {
            forward(callback, error, response, GetPackageResponseCodec.deserialize);
        }));
    }

    /**
     * Returns the status of a single package.
     */
    getPackageStatus(packageId: string, callback: Callback<GetPackageStatusResponse>): ClientCancellableCall {
        const request = new GetPackageStatusRequest();
        request.setLedgerId(this.ledgerId);
        request.setPackageId(packageId);
        return ClientCancellableCall.accept(this.client.getPackageStatus(request, (error, response) => {
            forward(callback, error, response, GetPackageStatusResponseCodec.deserialize);
        }));
    }

}
