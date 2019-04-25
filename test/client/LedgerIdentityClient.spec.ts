// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {assert, expect} from 'chai';
import {LedgerIdentityClient} from "../../src/client/LedgerIdentityClient";
import {DummyLedgerIdentityServiceClient} from "./DummyLedgerIdentityServiceClient";
import * as sinon from "sinon";
import {GetLedgerIdentityRequest as PbGetLedgerIdentityRequest} from "../../src/generated/com/digitalasset/ledger/api/v1/ledger_identity_service_pb";

describe("LedgerIdentityClient", () => {

    const latestRequestSpy = sinon.spy();
    const dummy = new DummyLedgerIdentityServiceClient(latestRequestSpy);
    const client = new LedgerIdentityClient(dummy);

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

});
