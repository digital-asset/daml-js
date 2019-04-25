// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {assert, expect} from 'chai';
import * as sinon from 'sinon';
import {SubmitAndWaitRequest} from "../../src/model/SubmitAndWaitRequest";
import {CommandClient} from "../../src/client/CommandClient";
import {JSONReporter} from "../../src/reporting/JSONReporter";
import {SubmitAndWaitRequestCodec} from "../../src/codec/SubmitAndWaitRequestCodec";
import {ValidationTree} from "../../src/validation/Validation";
import {DummyCommandServiceClient} from "./DummyCommandServiceClient";

describe("CommandClient", () => {

    afterEach(() => {
        sinon.restore();
        latestRequestSpy.resetHistory();
    });

    const emptyRequest: SubmitAndWaitRequest = {
        commands: {
            applicationId: 'some-application-id',
            commandId: 'some-command-id',
            ledgerEffectiveTime: {seconds: 42, nanoseconds: 47},
            maximumRecordTime: {seconds: 37, nanoseconds: 999},
            party: 'birthday-party',
            workflowId: 'some-workflow-id',
            list: []
        }
    };

    const request: SubmitAndWaitRequest = {
        commands: {
            applicationId: 'some-application-id',
            commandId: 'some-command-id',
            ledgerEffectiveTime: {seconds: 42, nanoseconds: 47},
            maximumRecordTime: {seconds: 37, nanoseconds: 999},
            party: 'birthday-party',
            workflowId: 'some-workflow-id',
            list: [
                {
                    __type__: 'create',
                    templateId: {packageId: 'tmplt', moduleName: 'cpluspls', entityName: 'ent'},
                    arguments: {
                        recordId: {packageId: 'pkg', moduleName: 'fernando', entityName: 'ent'},
                        fields: {
                            someValue: {__type__: 'bool', bool: true}
                        }
                    }
                }
            ]
        }
    };

    const latestRequestSpy = sinon.spy();
    const dummy = new DummyCommandServiceClient(latestRequestSpy);
    const client = new CommandClient('some-ledger-id', dummy, JSONReporter);

    it('should correctly forward a command', (done) => {
        client.submitAndWait(emptyRequest, (error, _) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(SubmitAndWaitRequestCodec.deserialize(latestRequestSpy.lastCall.lastArg)).to.deep.equal(emptyRequest);
            done();
        });
    });

    it('should set the ledger identifier properly', (done) => {
        client.submitAndWait(request, (error, _) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(SubmitAndWaitRequestCodec.deserialize(latestRequestSpy.lastCall.lastArg)).to.deep.equal(request);
            done();
        });
    });

    it('should perform validation on the SubmitAndWait endpoint', (done) => {

        const invalidRequest = {
            commands: {
                applicationId: 'app',
                commandId: 'cmd',
                party: 'birthday',
                ledgerEffectiveTime: {seconds: 0, nanoseconds: 1},
                maximumRecordTime: {seconds: 1, nanoseconds: 2},
                list: [
                    {
                        __type__: 'archive',
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
                                        __type__: 'unexpected-type-tag',
                                        actualTypeTag: 'archive',
                                        expectedTypeTags: ['create', 'exercise']
                                    }],
                                    children: {}
                                }
                            }
                        }
                    }
                },
            }
        };

        client.submitAndWait(invalidRequest as any as SubmitAndWaitRequest, error => {
            expect(error).to.not.be.null;
            expect(JSON.parse(error!.message)).to.deep.equal(expectedValidationTree);
            done();
        });

    });

});
