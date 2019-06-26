// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {assert, expect} from 'chai';
import * as sinon from 'sinon';
import {NodeJsPackageClient} from "../../src/client/NodeJsPackageClient";
import {
    GetPackageRequest as PbGetPackageRequest,
    GetPackageStatusRequest as PbGetPackageStatusRequest,
    ListPackagesRequest as PbListPackagesRequest
} from "../../src/generated/com/digitalasset/ledger/api/v1/package_service_pb";
import {DummyPackageServiceClient} from "./DummyPackageServiceClient";

describe("NodeJsPackageClient", () => {

    const ledgerId = 'some-cool-id';
    const latestRequestSpy = sinon.spy();

    const dummy = new DummyPackageServiceClient(latestRequestSpy);
    const client = new NodeJsPackageClient(ledgerId, dummy);

    afterEach(() => {
        sinon.restore();
        latestRequestSpy.resetHistory();
    });

    it("should send the request with the correct request and ledger identifier", (done) => {
        client.listPackages((error, _response) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce, 'The latestRequestSpy has not been called exactly once');
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbListPackagesRequest);
            const request = latestRequestSpy.lastCall.lastArg as PbListPackagesRequest;
            expect(request.getLedgerId()).to.equal(ledgerId);
            done();
        });
    });

    it("should send the request with the correct request and ledger identifier (promisified)", async () => {
        await client.listPackages();
        assert(latestRequestSpy.calledOnce, 'The latestRequestSpy has not been called exactly once');
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbListPackagesRequest);
        const request = latestRequestSpy.lastCall.lastArg as PbListPackagesRequest;
        expect(request.getLedgerId()).to.equal(ledgerId);
    });

    it("should send the package request with the correct request and package identifier", (done) => {
        client.getPackage('package-2', (error, _response) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce, 'The latestRequestSpy has not been called exactly once');
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetPackageRequest);
            const request = latestRequestSpy.lastCall.lastArg as PbGetPackageRequest;
            expect(request.getLedgerId()).to.equal(ledgerId);
            expect(request.getPackageId()).to.equal('package-2');
            done();
        });
    });

    it("should send the package request with the correct request and package identifier (promisified)", async () => {
        await client.getPackage('package-2', );
        assert(latestRequestSpy.calledOnce, 'The latestRequestSpy has not been called exactly once');
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetPackageRequest);
        const request = latestRequestSpy.lastCall.lastArg as PbGetPackageRequest;
        expect(request.getLedgerId()).to.equal(ledgerId);
        expect(request.getPackageId()).to.equal('package-2');
    });

    it("should send the package status request with the correct request and package identifier", (done) => {
        client.getPackageStatus('package-2', (error, _response) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce, 'The latestRequestSpy has not been called exactly once');
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetPackageStatusRequest);
            const request = latestRequestSpy.lastCall.lastArg as PbGetPackageStatusRequest;
            expect(request.getLedgerId()).to.equal(ledgerId);
            expect(request.getPackageId()).to.equal('package-2');
            done();
        });
    });

    it("should send the package status request with the correct request and package identifier (promisified)", async () => {
        await client.getPackageStatus('package-2', );
        assert(latestRequestSpy.calledOnce, 'The latestRequestSpy has not been called exactly once');
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetPackageStatusRequest);
        const request = latestRequestSpy.lastCall.lastArg as PbGetPackageStatusRequest;
        expect(request.getLedgerId()).to.equal(ledgerId);
        expect(request.getPackageId()).to.equal('package-2');
    });

});
