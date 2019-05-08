// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {assert, expect} from 'chai';
import * as sinon from 'sinon';
import {CommandSubmissionClient} from "../../src/client/CommandSubmissionClient";
import {SubmitRequest} from "../../src/model/SubmitRequest";
import {JSONReporter} from "../../src/reporting/JSONReporter";
import {SubmitRequestCodec} from "../../src/codec/SubmitRequestCodec";
import {ValidationTree} from "../../src/validation/Validation";
import {SubmitRequest as PbSubmitRequest} from "../../src/generated/com/digitalasset/ledger/api/v1/command_submission_service_pb";
import {DummyCommandSubmissionServiceClient} from "./DummyCommandSubmissionServiceClient";

describe('CommandSubmissionClient', () => {

    const ledgerId = 'watman';
    const latestRequestSpy = sinon.spy();
    const dummy = new DummyCommandSubmissionServiceClient(latestRequestSpy);
    const client = new CommandSubmissionClient(ledgerId, dummy, JSONReporter);

    const request: SubmitRequest = {
        commands: {
            applicationId: '2345',
            commandId: 'sfdgsdfg',
            ledgerEffectiveTime: {seconds: 5445, nanoseconds: 2342},
            maximumRecordTime: {seconds: 656, nanoseconds: 634},
            party: '452g245',
            workflowId: 'dfg346',
            list: [
                {
                    commandType: 'create',
                    templateId: {packageId: 'fgdfg', moduleName: 'dwgwdfg', entityName: 'alkhksjhd'},
                    arguments: {
                        recordId: {packageId: 'g3g42', moduleName: '314tgg5', entityName: '235lkj23'},
                        fields: {
                            contract: {valueType: 'contractId', contractId: 'sdg4tr34'},
                            someFlag: {valueType: 'bool', bool: true}
                        }
                    }
                }, {
                    commandType: 'exercise',
                    choice: 'sdfgv34g',
                    argument: {
                        valueType: 'decimal', decimal: '999'
                    },
                    contractId: 'f4f34f34f',
                    templateId: {packageId: 'f1234f34f', moduleName: '341f43f3', entityName: '239874hb'}
                }
            ]
        }
    };

    afterEach(() => {
        sinon.restore();
        latestRequestSpy.resetHistory();
    });

    it('should correctly forward a command', (done) => {
        client.submit(request, (error, _) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbSubmitRequest);
            const spiedRequest = latestRequestSpy.lastCall.lastArg as PbSubmitRequest;
            expect(SubmitRequestCodec.deserialize(spiedRequest)).to.deep.equal(request);
            done();
        });
    });

    it('should forward the command with the correct ledger identifier', (done) => {
        client.submit(request, (error, _) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbSubmitRequest);
            const spiedRequest = latestRequestSpy.lastCall.lastArg as PbSubmitRequest;
            expect(spiedRequest.getCommands()!.getLedgerId()).to.equal(ledgerId);
            done();
        });
    });

    it('should perform validation on the Submit endpoint', (done) => {

        const invalidRequest = {
            commands: {
                applicationId: 'app',
                commandId: 'cmd',
                party: 'birthday',
                ledgerEffectiveTime: {seconds: 0, nanoseconds: 1},
                maximumRecordTime: {seconds: 1, nanoseconds: 2},
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
        };

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
                        ledgerEffectiveTime: {
                            errors: [],
                            children: {
                                seconds: {
                                    errors: [],
                                    children: {}
                                },
                                nanoseconds: {
                                    errors: [],
                                    children: {}
                                }
                            }
                        },
                        maximumRecordTime: {
                            errors: [],
                            children: {
                                seconds: {
                                    errors: [],
                                    children: {}
                                },
                                nanoseconds: {
                                    errors: [],
                                    children: {}
                                }
                            }
                        },
                        list: {
                            errors: [],
                            children: {
                                '0': {
                                    errors: [{
                                        errorType: 'unexpected-type-tag',
                                        expectedTypeTags: ['create', 'exercise', 'createAndExercise'],
                                        actualTypeTag: 'archive'
                                    }],
                                    children: {}
                                }
                            }
                        }
                    }
                },
            }
        };

        client.submit(invalidRequest as any as SubmitRequest, error => {
            expect(error).to.not.be.null;
            expect(JSON.parse(error!.message)).to.deep.equal(expectedValidationTree);
            done();
        });

    });

});