// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {assert, expect} from 'chai';
import {NodeJsPartyManagementClient} from "../../src/client/NodeJsPartyManagementClient";
import {DummyPartyManagementServiceClient} from "./DummyPartyManagementServiceClient";
import * as sinon from "sinon";
import {ListKnownPartiesRequest as PbListKnownPartiesRequest, AllocatePartyRequest as PbAllocatePartyRequest} from "../../src/generated/com/digitalasset/ledger/api/v1/admin/party_management_service_pb";
import {JSONReporter} from "../../src/reporting/JSONReporter";
import {AllocatePartyRequest} from "../../src/model/AllocatePartyRequest";
import {ValidationTree} from "../../src/validation/Validation";

describe("NodeJsPartyManagementClient", () => {

    const latestRequestSpy = sinon.spy();
    const dummy = new DummyPartyManagementServiceClient(latestRequestSpy);
    const client = new NodeJsPartyManagementClient(dummy, JSONReporter);

    const allocatePartyRequest: AllocatePartyRequest = {
        partyIdHint: 'alice',
        displayName: 'Alice'
    };

    const invalidRequest: AllocatePartyRequest = {
        partyIdHin: 'alice',
        displayName: 42
    } as unknown as AllocatePartyRequest;

    const expectedValidationTree: ValidationTree = {
        errors: [
            {
                errorType: 'unexpected-key',
                key: 'partyIdHin'
            }
        ],
        children: {
            displayName: {
                children: {},
                errors: [
                    {
                        errorType: 'type-error',
                        actualType: 'number',
                        expectedType: 'string'
                    }
                ]
            }
        }
    };

    afterEach(() => {
        sinon.restore();
        latestRequestSpy.resetHistory();
    });

    it("should correctly ask to allocate a new party", (done) => {
        client.allocateParty(allocatePartyRequest, (error, _response) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce, 'The latestRequestSpy has not been called exactly once');
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbAllocatePartyRequest);
            const request = latestRequestSpy.lastCall.lastArg as PbAllocatePartyRequest;
            expect(request.getPartyIdHint()).to.equal(allocatePartyRequest.partyIdHint);
            expect(request.getDisplayName()).to.equal(allocatePartyRequest.displayName);
            done();
        });
    });

    it("should correctly ask to allocate a new party (promisified)", async () => {
        await client.allocateParty(allocatePartyRequest);
        assert(latestRequestSpy.calledOnce, 'The latestRequestSpy has not been called exactly once');
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbAllocatePartyRequest);
        const request = latestRequestSpy.lastCall.lastArg as PbAllocatePartyRequest;
        expect(request.getPartyIdHint()).to.equal(allocatePartyRequest.partyIdHint);
        expect(request.getDisplayName()).to.equal(allocatePartyRequest.displayName);
    });

    it('should perform validation on the AllocateParty endpoint', (done) => {
        client.allocateParty(invalidRequest, error => {
            expect(error).to.not.be.null;
            expect(JSON.parse(error!.message)).to.deep.equal(expectedValidationTree);
            done();
        });
    });

    it('should perform validation on the AllocateParty endpoint (promisified)', async () => {
        let errorThrown = false;
        try {
            await client.allocateParty(invalidRequest);
        } catch (error) {
            expect(error).to.not.be.null;
            expect(JSON.parse(error.message)).to.deep.equal(expectedValidationTree);
            errorThrown = true;
        }
        assert(errorThrown, 'an error was expected but none has been thrown');
    });

    it("should correctly ask to list the known parties", (done) => {
        client.listKnownParties((error, _response) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce, 'The latestRequestSpy has not been called exactly once');
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbListKnownPartiesRequest);
            done();
        });
    });

    it("should correctly ask to list the known parties (promisified)", async () => {
        await client.listKnownParties();
        assert(latestRequestSpy.calledOnce, 'The latestRequestSpy has not been called exactly once');
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbListKnownPartiesRequest);
    });

});
