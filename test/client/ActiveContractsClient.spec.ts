// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {assert, expect} from 'chai';
import * as sinon from 'sinon';
import {
    GetActiveContractsRequest as PbGetActiveContractsRequest
} from "../../src/generated/com/digitalasset/ledger/api/v1/active_contracts_service_pb";
import {ActiveContractsClient} from "../../src/client/ActiveContractsClient";
import {JSONReporter} from "../../src/reporting/JSONReporter";
import {GetActiveContractsRequestCodec} from "../../src/codec/GetActiveContractsRequestCodec";
import {ValidationTree} from "../../src/validation/Validation";
import {GetActiveContractsRequest} from "../../src/model/GetActiveContractsRequest";
import {DummyActiveContractsServiceClient} from "./DummyActiveContractsServiceClient";

describe("ActiveContractsClient", () => {

    const ledgerId = 'some-ledger-id';
    const latestRequestSpy = sinon.spy();
    const dummy = new DummyActiveContractsServiceClient(latestRequestSpy);
    const client = new ActiveContractsClient(ledgerId, dummy, JSONReporter);

    afterEach(() => {
        sinon.restore();
        latestRequestSpy.resetHistory();
    });

    it('should pass the filter and verbose options to the server', (done) => {
        const request = {
            verbose: false,
            filter: {
                filtersByParty: {
                    alice: {
                        inclusive: {
                            templateIds: [{
                                packageId: 'packageId',
                                moduleName: 'mod1',
                                entityName: 'ent1'
                            }]
                        }
                    }
                }
            }
        };

        const call = client.getActiveContracts(request);
        call.on('end', () => {
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(GetActiveContractsRequestCodec.deserialize(latestRequestSpy.lastCall.lastArg)).to.deep.equal(request);
            done();
        });
        call.on('error', (error) => {
            done(error);
        });

    });

    it('should set verbose to true by default', (done) => {
        const request = {
            filter: {
                filtersByParty: {
                    alice: {
                        inclusive: {
                            templateIds: [{
                                packageId: 'packageId',
                                moduleName: 'mod1',
                                entityName: 'ent1'
                            }]
                        }
                    }
                }
            }
        };

        const call = client.getActiveContracts(request);
        call.on('end', () => {
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetActiveContractsRequest;
            expect(spiedRequest.getVerbose()).to.be.true;
            done();
        });
        call.on('error', (error) => {
            done(error);
        });

    });

    it("should send the request with the correct ledger identifier", (done) => {
        const request = {
            verbose: true,
            filter: {
                filtersByParty: {
                    alice: {
                        inclusive: {
                            templateIds: [{
                                packageId: 'packageId',
                                moduleName: 'mod1',
                                entityName: 'ent1'
                            }]
                        }
                    }
                }
            }
        };

        const call = client.getActiveContracts(request);
        call.on('end', () => {
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetActiveContractsRequest);
            const request = latestRequestSpy.lastCall.lastArg as PbGetActiveContractsRequest;
            expect(request.getLedgerId()).to.equal(ledgerId);
            done();
        });
        call.on('error', (error) => {
            done(error);
        });

    });

    it('should perform validation on the GetActiveContracts endpoint', (done) => {

        const invalidRequest = {
            filter: {
                filtersByarty: {
                    barbara: {
                        inclusive: {}
                    }
                }
            }
        };

        const expectedValidationTree: ValidationTree = {
            errors: [],
            children: {
                filter: {
                    errors: [{
                        errorType: 'missing-key',
                        expectedKey: 'filtersByParty',
                        expectedType: 'Record<string, Filters>'
                    }, {
                        errorType: 'unexpected-key',
                        key: 'filtersByarty'
                    }],
                    children: {}
                }
            }
        };

        let passed = false;
        const call = client.getActiveContracts(invalidRequest as any as GetActiveContractsRequest);
        call.on('data', (_data) => {
            done(new Error('unexpected data received'));
        });
        call.on('error', (error) => {
            expect(JSON.parse(error.message)).to.deep.equal(expectedValidationTree);
            passed = true;
        });
        call.on('end', () => {
            assert(passed);
            done();
        });

    });

});
