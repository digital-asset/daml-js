// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {assert, expect} from 'chai';
import * as sinon from 'sinon';
import {SubmitAndWaitRequest} from "../../src/model/SubmitAndWaitRequest";
import {SubmitAndWaitRequest as PbSubmitAndWaitRequest} from "../../src/generated/com/digitalasset/ledger/api/v1/command_service_pb";
import {NodeJsCommandClient} from "../../src/client/NodeJsCommandClient";
import {JSONReporter} from "../../src/reporting/JSONReporter";
import {SubmitAndWaitRequestCodec} from "../../src/codec/SubmitAndWaitRequestCodec";
import {ValidationTree} from "../../src/validation/Validation";
import {DummyCommandServiceClient} from "./DummyCommandServiceClient";

describe("NodeJsCommandClient", () => {

    afterEach(() => {
        sinon.restore();
        latestRequestSpy.resetHistory();
    });

    const request: SubmitAndWaitRequest = {
        commands: {
            applicationId: 'some-application-id',
            commandId: 'some-command-id',
            party: 'birthday-party',
            workflowId: 'some-workflow-id',
            list: [
                {
                    commandType: 'create',
                    templateId: {packageId: 'tmplt', moduleName: 'cpluspls', entityName: 'ent'},
                    arguments: {
                        recordId: {packageId: 'pkg', moduleName: 'fernando', entityName: 'ent'},
                        fields: {
                            someValue: {valueType: 'bool', bool: true}
                        }
                    }
                }
            ]
        }
    };

    const invalidRequest: SubmitAndWaitRequest = {
        commands: {
            applicationId: 'app',
            commandId: 'cmd',
            party: 'birthday',
            list: [
                {
                    commandType: 'archive',
                    templateId: {
                        name: 'foo',
                        packageId: 'bar'
                    }
                }
            ]
        }
    } as unknown as SubmitAndWaitRequest;

    const expectedValidationTree: ValidationTree = {
        errors: [],
        children: {
            commands: {
                errors: [],
                children: {
                    applicationId: {
                        errors: [],
                        children: {}
                    },
                    commandId: {
                        errors: [],
                        children: {}
                    },
                    party: {
                        errors: [],
                        children: {}
                    },
                    list: {
                        errors: [],
                        children: {
                            '0': {
                                errors: [{
                                    errorType: 'unexpected-type-tag',
                                    actualTypeTag: 'archive',
                                    expectedTypeTags: ['create', 'exercise', 'createAndExercise']
                                }],
                                children: {}
                            }
                        }
                    }
                }
            },
        }
    };

    const ledgerId = 'some-ledger-id';
    const latestRequestSpy = sinon.spy();
    const dummy = new DummyCommandServiceClient(latestRequestSpy);
    const client = new NodeJsCommandClient(ledgerId, dummy, JSONReporter);

    it('should correctly forward a command on the SubmitAndWait endpoint', (done) => {
        client.submitAndWait(request, (error, _) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(SubmitAndWaitRequestCodec.deserialize(latestRequestSpy.lastCall.lastArg)).to.deep.equal(request);
            done();
        });
    });

    it('should correctly forward a command on the SubmitAndWait endpoint (promisified)', async () => {
        await client.submitAndWait(request);
        assert(latestRequestSpy.calledOnce);
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        expect(SubmitAndWaitRequestCodec.deserialize(latestRequestSpy.lastCall.lastArg)).to.deep.equal(request);
    });

    it('should set the ledger identifier properly on the SubmitAndWait endpoint', (done) => {
        client.submitAndWait(request, (error, _) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            const request = latestRequestSpy.lastCall.lastArg as PbSubmitAndWaitRequest;
            expect(request.getCommands()!.getLedgerId()).to.deep.equal(ledgerId);
            done();
        });
    });

    it('should set the ledger identifier properly on the SubmitAndWait endpoint (promisified)', async () => {
        await client.submitAndWait(request);
        assert(latestRequestSpy.calledOnce);
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        const spiedRequest = latestRequestSpy.lastCall.lastArg as PbSubmitAndWaitRequest;
        expect(spiedRequest.getCommands()!.getLedgerId()).to.deep.equal(ledgerId);
    });

    it('should perform validation on the SubmitAndWait endpoint', (done) => {
        client.submitAndWait(invalidRequest, error => {
            expect(error).to.not.be.null;
            expect(JSON.parse(error!.message)).to.deep.equal(expectedValidationTree);
            client.submitAndWaitForTransactionId(invalidRequest as any as SubmitAndWaitRequest, error => {
                expect(error).to.not.be.null;
                expect(JSON.parse(error!.message)).to.deep.equal(expectedValidationTree);
                done();
            });
        });
    });

    it('should perform validation on the SubmitAndWait endpoint (promisified)', async () => {
        let errorThrown = false;
        try {
            await client.submitAndWait(invalidRequest);
        } catch (error) {
            expect(error).to.not.be.null;
            expect(JSON.parse(error.message)).to.deep.equal(expectedValidationTree);
            errorThrown = true;
        }
        assert(errorThrown, 'an error was expected but none has been thrown');
    });

    it('should correctly forward a command on the SubmitAndWaitForTransaction endpoint', (done) => {
        client.submitAndWaitForTransaction(request, (error, _) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(SubmitAndWaitRequestCodec.deserialize(latestRequestSpy.lastCall.lastArg)).to.deep.equal(request);
            done();
        });
    });

    it('should correctly forward a command on the SubmitAndWaitForTransaction endpoint (promisified)', async () => {
        await client.submitAndWaitForTransaction(request);
        assert(latestRequestSpy.calledOnce);
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        expect(SubmitAndWaitRequestCodec.deserialize(latestRequestSpy.lastCall.lastArg)).to.deep.equal(request);
    });

    it('should set the ledger identifier properly on the SubmitAndWaitForTransaction endpoint', (done) => {
        client.submitAndWaitForTransaction(request, (error, _) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            const request = latestRequestSpy.lastCall.lastArg as PbSubmitAndWaitRequest;
            expect(request.getCommands()!.getLedgerId()).to.deep.equal(ledgerId);
            done();
        });
    });

    it('should set the ledger identifier properly on the SubmitAndWaitForTransaction endpoint (promisified)', async () => {
        await client.submitAndWaitForTransaction(request);
        assert(latestRequestSpy.calledOnce);
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        const spiedRequest = latestRequestSpy.lastCall.lastArg as PbSubmitAndWaitRequest;
        expect(spiedRequest.getCommands()!.getLedgerId()).to.deep.equal(ledgerId);
    });

    it('should perform validation on the SubmitAndWaitForTransaction endpoint', (done) => {
        client.submitAndWaitForTransaction(invalidRequest, error => {
            expect(error).to.not.be.null;
            expect(JSON.parse(error!.message)).to.deep.equal(expectedValidationTree);
            client.submitAndWaitForTransactionId(invalidRequest as any as SubmitAndWaitRequest, error => {
                expect(error).to.not.be.null;
                expect(JSON.parse(error!.message)).to.deep.equal(expectedValidationTree);
                done()
            });
        });
    });

    it('should perform validation on the SubmitAndWaitForTransaction endpoint (promisified)', async () => {
        let errorThrown = false;
        try {
            await client.submitAndWaitForTransaction(invalidRequest);
        } catch (error) {
            expect(error).to.not.be.null;
            expect(JSON.parse(error.message)).to.deep.equal(expectedValidationTree);
            errorThrown = true;
        }
        assert(errorThrown, 'an error was expected but none has been thrown');
    });

    it('should correctly forward a command on the SubmitAndWaitForTransactionId endpoint', (done) => {
        client.submitAndWaitForTransactionId(request, (error, _) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(SubmitAndWaitRequestCodec.deserialize(latestRequestSpy.lastCall.lastArg)).to.deep.equal(request);
            done();
        });
    });

    it('should correctly forward a command on the SubmitAndWaitForTransactionId endpoint (promisified)', async () => {
        await client.submitAndWaitForTransactionId(request);
        assert(latestRequestSpy.calledOnce);
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        expect(SubmitAndWaitRequestCodec.deserialize(latestRequestSpy.lastCall.lastArg)).to.deep.equal(request);
    });

    it('should set the ledger identifier properly on the SubmitAndWaitForTransactionId endpoint', (done) => {
        client.submitAndWaitForTransactionId(request, (error, _) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            const request = latestRequestSpy.lastCall.lastArg as PbSubmitAndWaitRequest;
            expect(request.getCommands()!.getLedgerId()).to.deep.equal(ledgerId);
            done();
        });
    });

    it('should set the ledger identifier properly on the SubmitAndWaitForTransactionId endpoint (promisified)', async () => {
        await client.submitAndWaitForTransactionId(request);
        assert(latestRequestSpy.calledOnce);
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        const spiedRequest = latestRequestSpy.lastCall.lastArg as PbSubmitAndWaitRequest;
        expect(spiedRequest.getCommands()!.getLedgerId()).to.deep.equal(ledgerId);
    });

    it('should perform validation on the SubmitAndWaitForTransactionId endpoint', (done) => {
        client.submitAndWaitForTransactionId(invalidRequest, error => {
            expect(error).to.not.be.null;
            expect(JSON.parse(error!.message)).to.deep.equal(expectedValidationTree);
            client.submitAndWaitForTransactionId(invalidRequest as any as SubmitAndWaitRequest, error => {
                expect(error).to.not.be.null;
                expect(JSON.parse(error!.message)).to.deep.equal(expectedValidationTree);
                done()
            });
        });
    });

    it('should perform validation on the SubmitAndWaitForTransactionId endpoint (promisified)', async () => {
        let errorThrown = false;
        try {
            await client.submitAndWaitForTransactionId(invalidRequest);
        } catch (error) {
            expect(error).to.not.be.null;
            expect(JSON.parse(error.message)).to.deep.equal(expectedValidationTree);
            errorThrown = true;
        }
        assert(errorThrown, 'an error was expected but none has been thrown');
    });

    it('should correctly forward a command on the SubmitAndWaitForTransactionTree endpoint', (done) => {
        client.submitAndWaitForTransactionTree(request, (error, _) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(SubmitAndWaitRequestCodec.deserialize(latestRequestSpy.lastCall.lastArg)).to.deep.equal(request);
            done();
        });
    });

    it('should correctly forward a command on the SubmitAndWaitForTransactionTree endpoint (promisified)', async () => {
        await client.submitAndWaitForTransactionTree(request);
        assert(latestRequestSpy.calledOnce);
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        expect(SubmitAndWaitRequestCodec.deserialize(latestRequestSpy.lastCall.lastArg)).to.deep.equal(request);
    });

    it('should set the ledger identifier properly on the SubmitAndWaitForTransactionTree endpoint', (done) => {
        client.submitAndWaitForTransactionTree(request, (error, _) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            const request = latestRequestSpy.lastCall.lastArg as PbSubmitAndWaitRequest;
            expect(request.getCommands()!.getLedgerId()).to.deep.equal(ledgerId);
            done();
        });
    });

    it('should set the ledger identifier properly on the SubmitAndWaitForTransactionTree endpoint (promisified)', async () => {
        await client.submitAndWaitForTransactionTree(request);
        assert(latestRequestSpy.calledOnce);
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        const spiedRequest = latestRequestSpy.lastCall.lastArg as PbSubmitAndWaitRequest;
        expect(spiedRequest.getCommands()!.getLedgerId()).to.deep.equal(ledgerId);
    });

    it('should perform validation on the SubmitAndWaitForTransactionTree endpoint', (done) => {
        client.submitAndWaitForTransactionTree(invalidRequest, error => {
            expect(error).to.not.be.null;
            expect(JSON.parse(error!.message)).to.deep.equal(expectedValidationTree);
            client.submitAndWaitForTransactionTree(invalidRequest as any as SubmitAndWaitRequest, error => {
                expect(error).to.not.be.null;
                expect(JSON.parse(error!.message)).to.deep.equal(expectedValidationTree);
                done()
            });
        });
    });

    it('should perform validation on the SubmitAndWaitForTransactionTree endpoint (promisified)', async () => {
        let errorThrown = false;
        try {
            await client.submitAndWaitForTransactionTree(invalidRequest);
        } catch (error) {
            expect(error).to.not.be.null;
            expect(JSON.parse(error.message)).to.deep.equal(expectedValidationTree);
            errorThrown = true;
        }
        assert(errorThrown, 'an error was expected but none has been thrown');
    });

});
