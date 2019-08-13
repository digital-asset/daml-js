// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {assert, expect} from 'chai';
import * as sinon from 'sinon';
import {JSONReporter} from "../../src/reporting/JSONReporter";
import {
    CompletionEndRequest as PbCompletionEndRequest,
    CompletionStreamRequest as PbCompletionStreamRequest
} from "../../src/generated/com/digitalasset/ledger/api/v1/command_completion_service_pb";
import {CompletionStreamRequestCodec} from "../../src/codec/CompletionStreamRequestCodec";
import {ValidationTree} from "../../src/validation/Validation";
import {CompletionStreamRequest} from "../../src/model/CompletionStreamRequest";
import {DummyCommandCompletionServiceClient} from "./DummyCommandCompletionServiceClient";
import {NodeJsCommandCompletionClient} from "../../src/client/NodeJsCommandCompletionClient";

describe('NodeJsCommandCompletionClient', () => {

    const ledgerId = 'cafebabe';

    const latestRequestSpy = sinon.spy();
    const dummy = new DummyCommandCompletionServiceClient(latestRequestSpy);
    const client = new NodeJsCommandCompletionClient(ledgerId, dummy, JSONReporter);

    afterEach(() => {
        sinon.restore();
        latestRequestSpy.resetHistory();
    });

    it('should send the correct request', (done) => {

        client.completionEnd((error, _response) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbCompletionEndRequest);
            const request = latestRequestSpy.lastCall.lastArg as PbCompletionEndRequest;
            expect(request.getLedgerId()).to.equal(ledgerId);
            done();
        });

    });

    it('should send the correct request (promisified)', async () => {

        await client.completionEnd();

        assert(latestRequestSpy.calledOnce);
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbCompletionEndRequest);
        const request = latestRequestSpy.lastCall.lastArg as PbCompletionEndRequest;
        expect(request.getLedgerId()).to.equal(ledgerId);

    });

    it('should send the request with the correct ledger identifier, start offset, application identifier and requested parties', (done) => {

        const request: CompletionStreamRequest = {
            applicationId: 'foobar',
            offset: {offsetType: 'absolute', absolute: '31'},
            parties: ['alice', 'bob']
        };
        const call = client.completionStream(request);
        call.on('end', () => {
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbCompletionStreamRequest);
            const spiedRequest = latestRequestSpy.lastCall.lastArg as PbCompletionStreamRequest;
            expect(spiedRequest.getLedgerId()).to.equal(ledgerId);
            expect(CompletionStreamRequestCodec.deserialize(spiedRequest)).to.deep.equal(request);
            done();
        });
        call.on('error', (error) => {
            done(error);
        });

    });

    it('should perform validation on the CompletionStream endpoint', (done) => {

        const invalidRequest = {
            applicationId: 'app',
            offset: {
                absolute: '1'
            },
            parties: ['birthday', 42]
        };

        const expectedValidationTree: ValidationTree = {
            errors: [],
            children: {
                applicationId: {
                    errors: [],
                    children: {}
                },
                offset: {
                    errors: [{
                        errorType: 'missing-type-tag',
                        expectedTypeTags: ['absolute', 'boundary']
                    }],
                    children: {}
                },
                parties: {
                    errors: [],
                    children: {
                        '0': {
                            errors: [],
                            children: {}
                        },
                        '1': {
                            errors: [{
                                errorType: 'type-error',
                                expectedType: 'string',
                                actualType: 'number'
                            }],
                            children: {}
                        }
                    }
                }
            }
        };

        let passed = false;
        const call = client.completionStream(invalidRequest as any as CompletionStreamRequest);
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