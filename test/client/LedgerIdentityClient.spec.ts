// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {assert, expect} from 'chai';
import {NodeJsLedgerIdentityClient} from "../../src/client/NodeJsLedgerIdentityClient";
import {DummyLedgerIdentityServiceClient} from "./DummyLedgerIdentityServiceClient";
import * as sinon from "sinon";
import {GetLedgerIdentityRequest as PbGetLedgerIdentityRequest} from "../../src/generated/com/daml/ledger/api/v1/ledger_identity_service_pb";

describe("NodeJsLedgerIdentityClient", () => {

    const latestRequestSpy = sinon.spy();
    const dummy = new DummyLedgerIdentityServiceClient(latestRequestSpy);
    const client = new NodeJsLedgerIdentityClient(dummy);

    afterEach(() => {
        sinon.restore();
        latestRequestSpy.resetHistory();
    });

    it("should correctly send the request to the server", (done) => {
        client.getLedgerIdentity((error, _response) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce, 'The latestRequestSpy has not been called exactly once');
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetLedgerIdentityRequest);
            done();
        });
    });

    it("should correctly send the request to the server (promisified)", async () => {
        await client.getLedgerIdentity();
        assert(latestRequestSpy.calledOnce, 'The latestRequestSpy has not been called exactly once');
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetLedgerIdentityRequest);
    });

});
