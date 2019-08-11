// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {assert, expect} from 'chai';
import {NodeJsPartyManagementClient} from "../../src/client/NodeJsPartyManagementClient";
import {DummyPartyManagementServiceClient} from "./DummyPartyManagementServiceClient";
import * as sinon from "sinon";
import {ListKnownPartiesRequest as PbListKnownPartiesRequest} from "../../src/generated/com/digitalasset/ledger/api/v1/admin/party_management_service_pb";

describe("NodeJsPartyManagementClient", () => {

    const latestRequestSpy = sinon.spy();
    const dummy = new DummyPartyManagementServiceClient(latestRequestSpy);
    const client = new NodeJsPartyManagementClient(dummy);

    afterEach(() => {
        sinon.restore();
        latestRequestSpy.resetHistory();
    });

    it("should correctly send the request to the server", (done) => {
        client.listKnownParties((error, _response) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce, 'The latestRequestSpy has not been called exactly once');
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbListKnownPartiesRequest);
            done();
        });
    });

    it("should correctly send the request to the server (promisified)", async () => {
        await client.listKnownParties();
        assert(latestRequestSpy.calledOnce, 'The latestRequestSpy has not been called exactly once');
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbListKnownPartiesRequest);
    });

});
