// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {assert, expect} from 'chai';
import * as sinon from 'sinon';
import {GetTransactionsRequest} from "../../src/model/GetTransactionsRequest";
import {GetTransactionByIdRequest} from "../../src/model/GetTransactionByIdRequest";
import {GetTransactionByEventIdRequest} from "../../src/model/GetTransactionByEventIdRequest";
import {NodeJsTransactionClient} from "../../src/client/NodeJsTransactionClient";
import {ValidationTree} from "../../src/validation/Validation";
import {LedgerOffsetBoundaryValue} from "../../src/model/LedgerOffset";
import {JSONReporter} from "../../src/reporting/JSONReporter";
import {
    GetLedgerEndRequest as PbGetLedgerEndRequest,
    GetTransactionByEventIdRequest as PbGetTransactionByEventIdRequest,
    GetTransactionByIdRequest as PbGetTransactionByIdRequest,
    GetTransactionsRequest as PbGetTransactionsRequest
} from "../../src/generated/com/digitalasset/ledger/api/v1/transaction_service_pb";
import {DummyTransactionServiceClient} from "./DummyTransactionServiceClient";

describe('NodeJsTransactionClient', () => {

    const transactionsRequest: GetTransactionsRequest = {
        begin: {
            offsetType: 'absolute',
            absolute: '42'
        },
        filter: {
            filtersByParty: {
                someParty: {
                    inclusive: {
                        templateIds: [
                            {packageId: 'foo1', moduleName: 'bar1', entityName: 'baz1'},
                            {packageId: 'foo2', moduleName: 'bar2', entityName: 'baz2'},
                        ]
                    }
                },
                someOtherParty: {}
            }
        },
        verbose: false
    };

    const transactionByIdRequest: GetTransactionByIdRequest = {
        requestingParties: ['joel', 'ethan'],
        transactionId: 'cafebabe'
    };

    const transactionByEventIdRequest: GetTransactionByEventIdRequest = {
        requestingParties: ['barbara', 'samuel'],
        eventId: 'some-created-id'
    };

    const latestRequestSpy = sinon.spy();
    const ledgerId = 'deadbeef';
    const dummy = new DummyTransactionServiceClient(latestRequestSpy);
    const client = new NodeJsTransactionClient(ledgerId, dummy, JSONReporter);

    afterEach(() => {
        latestRequestSpy.resetHistory();
        sinon.restore();
    });

    it('should pass the correct start offset, end offset, transaction filter and verbose flag', (done) => {

        const call = client.getTransactions(transactionsRequest);
        call.on('error', (error) => {
            done(error);
        });
        call.on('end', () => {
            assert(latestRequestSpy.calledOnce, 'The latestRequestSpy has not been called exactly once');
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.instanceof(PbGetTransactionsRequest);
            const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetTransactionsRequest;
            expect(spiedRequest.getBegin()!.hasAbsolute()).to.be.true;
            expect(spiedRequest.getBegin()!.getAbsolute()).to.equal('42');
            expect(spiedRequest.hasEnd()).to.be.false;
            expect(spiedRequest.getFilter()!.getFiltersByPartyMap().has('someParty')).to.be.true;
            const templates = spiedRequest.getFilter()!.getFiltersByPartyMap().get('someParty')!.getInclusive()!.getTemplateIdsList()!;
            expect(templates).to.have.lengthOf(2);
            expect(templates[0].getModuleName()).to.equal('bar1');
            expect(templates[0].getEntityName()).to.equal('baz1');
            expect(templates[0].getPackageId()).to.equal('foo1');
            expect(templates[1].getModuleName()).to.equal('bar2');
            expect(templates[1].getEntityName()).to.equal('baz2');
            expect(templates[1].getPackageId()).to.equal('foo2');
            expect(spiedRequest.getVerbose()).to.be.false;
            done();
        });

    });

    it('should set the verbose flag to true by default', (done) => {

        const requestWithoutExplicitVerbose = {...transactionsRequest};
        delete requestWithoutExplicitVerbose.verbose;

        const call = client.getTransactions(requestWithoutExplicitVerbose);
        call.on('error', (error) => {
            done(error);
        });
        call.on('end', () => {
            assert(latestRequestSpy.calledOnce, 'The latestRequestSpy has not been called exactly once');
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.instanceof(PbGetTransactionsRequest);
            const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetTransactionsRequest;
            expect(spiedRequest.getVerbose()).to.be.true;
            done();
        });

    });

    it('should request the transaction stream with the correct ledger identifier', (done) => {

        const call = client.getTransactions(transactionsRequest);
        call.on('error', (error) => {
            done(error);
        });
        call.on('end', () => {
            assert(latestRequestSpy.calledOnce, 'The latestRequestSpy has not been called exactly once');
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.instanceof(PbGetTransactionsRequest);
            const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetTransactionsRequest;
            expect(spiedRequest.getLedgerId()).to.equal(ledgerId);
            done();
        });

    });

    it('should pass the start offset, end offset, transaction filter and verbose flag to the transaction trees endpoint', (done) => {

        const call = client.getTransactionTrees(transactionsRequest);
        call.on('error', (error) => {
            done(error);
        });
        call.on('end', () => {
            assert(latestRequestSpy.calledOnce, 'The latestRequestSpy has not been called exactly once');
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.instanceof(PbGetTransactionsRequest);
            const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetTransactionsRequest;
            expect(spiedRequest.getBegin()!.hasAbsolute()).to.be.true;
            expect(spiedRequest.getBegin()!.getAbsolute()).to.equal('42');
            expect(spiedRequest.hasEnd()).to.be.false;
            expect(spiedRequest.getFilter()!.getFiltersByPartyMap().has('someParty')).to.be.true;
            const templates = spiedRequest.getFilter()!.getFiltersByPartyMap().get('someParty')!.getInclusive()!.getTemplateIdsList()!;
            expect(templates).to.have.lengthOf(2);
            expect(templates[0].getModuleName()).to.equal('bar1');
            expect(templates[0].getEntityName()).to.equal('baz1');
            expect(templates[0].getPackageId()).to.equal('foo1');
            expect(templates[1].getModuleName()).to.equal('bar2');
            expect(templates[1].getEntityName()).to.equal('baz2');
            expect(templates[1].getPackageId()).to.equal('foo2');
            expect(spiedRequest.getVerbose()).to.be.false;
            done();
        });

    });

    it('should pass the correct ledger identifier to the transaction trees request', (done) => {
        const call = client.getTransactionTrees(transactionsRequest);
        call.on('error', (error) => {
            done(error);
        });
        call.on('end', () => {
            assert(latestRequestSpy.calledOnce, 'The latestRequestSpy has not been called exactly once');
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.instanceof(PbGetTransactionsRequest);
            const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetTransactionsRequest;
            expect(spiedRequest.getLedgerId()).to.equal(ledgerId);
            done();
        });

    });

    it('should pass the requesting parties to the transaction lookup by event identifier endpoint', (done) => {

        client.getTransactionByEventId(transactionByEventIdRequest, (error, _response) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetTransactionByEventIdRequest);
            const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetTransactionByEventIdRequest;
            expect(spiedRequest.getRequestingPartiesList()).to.have.lengthOf(2);
            expect(spiedRequest.getRequestingPartiesList()![0]).to.equal('barbara');
            expect(spiedRequest.getRequestingPartiesList()![1]).to.equal('samuel');
            done();
        });

    });

    it('should pass the requesting parties to the transaction lookup by event identifier endpoint (promisified)', async () => {

        await client.getTransactionByEventId(transactionByEventIdRequest);
        assert(latestRequestSpy.calledOnce);
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetTransactionByEventIdRequest);
        const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetTransactionByEventIdRequest;
        expect(spiedRequest.getRequestingPartiesList()).to.have.lengthOf(2);
        expect(spiedRequest.getRequestingPartiesList()![0]).to.equal('barbara');
        expect(spiedRequest.getRequestingPartiesList()![1]).to.equal('samuel');

    });

    it('should pass the requesting parties to the flat transaction lookup by event identifier endpoint', (done) => {

        client.getFlatTransactionByEventId(transactionByEventIdRequest, (error, _response) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetTransactionByEventIdRequest);
            const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetTransactionByEventIdRequest;
            expect(spiedRequest.getRequestingPartiesList()).to.have.lengthOf(2);
            expect(spiedRequest.getRequestingPartiesList()![0]).to.equal('barbara');
            expect(spiedRequest.getRequestingPartiesList()![1]).to.equal('samuel');
            done();
        });

    });

    it('should pass the requesting parties to the flat transaction lookup by event identifier endpoint (promisified)', async () => {

        await client.getFlatTransactionByEventId(transactionByEventIdRequest);
        assert(latestRequestSpy.calledOnce);
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetTransactionByEventIdRequest);
        const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetTransactionByEventIdRequest;
        expect(spiedRequest.getRequestingPartiesList()).to.have.lengthOf(2);
        expect(spiedRequest.getRequestingPartiesList()![0]).to.equal('barbara');
        expect(spiedRequest.getRequestingPartiesList()![1]).to.equal('samuel');

    });

    it('should pass the correct ledger identifier to the transaction lookup by event identifier endpoint', (done) => {

        client.getTransactionByEventId(transactionByEventIdRequest, (error, _response) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetTransactionByEventIdRequest);
            const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetTransactionByEventIdRequest;
            expect(spiedRequest.getLedgerId()).to.equal(ledgerId);
            done();
        });

    });

    it('should pass the correct ledger identifier to the transaction lookup by event identifier endpoint (promisified)', async () => {

        await client.getTransactionByEventId(transactionByEventIdRequest);
        assert(latestRequestSpy.calledOnce);
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetTransactionByEventIdRequest);
        const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetTransactionByEventIdRequest;
        expect(spiedRequest.getLedgerId()).to.equal(ledgerId);

    });

    it('should pass the correct ledger identifier to the flat transaction lookup by event identifier endpoint', (done) => {

        client.getFlatTransactionByEventId(transactionByEventIdRequest, (error, _response) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetTransactionByEventIdRequest);
            const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetTransactionByEventIdRequest;
            expect(spiedRequest.getLedgerId()).to.equal(ledgerId);
            done();
        });

    });

    it('should pass the correct ledger identifier to the flat transaction lookup by event identifier endpoint (promisified)', async () => {

        await client.getFlatTransactionByEventId(transactionByEventIdRequest);
        assert(latestRequestSpy.calledOnce);
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetTransactionByEventIdRequest);
        const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetTransactionByEventIdRequest;
        expect(spiedRequest.getLedgerId()).to.equal(ledgerId);

    });

    it('should pass the requesting parties to the transaction lookup by transaction identifier endpoint', (done) => {

        client.getTransactionById(transactionByIdRequest, (error, _response) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetTransactionByIdRequest);
            const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetTransactionByIdRequest;
            expect(spiedRequest.getRequestingPartiesList()).to.have.lengthOf(2);
            expect(spiedRequest.getRequestingPartiesList()![0]).to.equal('joel');
            expect(spiedRequest.getRequestingPartiesList()![1]).to.equal('ethan');
            done();
        });

    });

    it('should pass the requesting parties to the transaction lookup by transaction identifier endpoint (promisified)', async () => {

        await client.getTransactionById(transactionByIdRequest);
        assert(latestRequestSpy.calledOnce);
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetTransactionByIdRequest);
        const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetTransactionByIdRequest;
        expect(spiedRequest.getRequestingPartiesList()).to.have.lengthOf(2);
        expect(spiedRequest.getRequestingPartiesList()![0]).to.equal('joel');
        expect(spiedRequest.getRequestingPartiesList()![1]).to.equal('ethan');

    });

    it('should pass the requesting parties to the flat transaction lookup by transaction identifier endpoint', (done) => {

        client.getFlatTransactionById(transactionByIdRequest, (error, _response) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetTransactionByIdRequest);
            const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetTransactionByIdRequest;
            expect(spiedRequest.getRequestingPartiesList()).to.have.lengthOf(2);
            expect(spiedRequest.getRequestingPartiesList()![0]).to.equal('joel');
            expect(spiedRequest.getRequestingPartiesList()![1]).to.equal('ethan');
            done();
        });

    });

    it('should pass the requesting parties to the flat transaction lookup by transaction identifier endpoint (promisified)', async () => {

        await client.getFlatTransactionById(transactionByIdRequest);
        assert(latestRequestSpy.calledOnce);
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetTransactionByIdRequest);
        const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetTransactionByIdRequest;
        expect(spiedRequest.getRequestingPartiesList()).to.have.lengthOf(2);
        expect(spiedRequest.getRequestingPartiesList()![0]).to.equal('joel');
        expect(spiedRequest.getRequestingPartiesList()![1]).to.equal('ethan');

    });

    it('should pass the correct ledger identifier to the transaction lookup by transaction identifier', (done) => {

        client.getTransactionById(transactionByIdRequest, (error, _response) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetTransactionByIdRequest);
            const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetTransactionByIdRequest;
            expect(spiedRequest.getLedgerId()).to.equal(ledgerId);
            done();
        });

    });

    it('should pass the correct ledger identifier to the transaction lookup by transaction identifier (promisified)', async () => {

        await client.getTransactionById(transactionByIdRequest);
        assert(latestRequestSpy.calledOnce);
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetTransactionByIdRequest);
        const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetTransactionByIdRequest;
        expect(spiedRequest.getLedgerId()).to.equal(ledgerId);

    });

    it('should pass the correct ledger identifier to the flat transaction lookup by transaction identifier', (done) => {

        client.getFlatTransactionById(transactionByIdRequest, (error, _response) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetTransactionByIdRequest);
            const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetTransactionByIdRequest;
            expect(spiedRequest.getLedgerId()).to.equal(ledgerId);
            done();
        });

    });

    it('should pass the correct ledger identifier to the flat transaction lookup by transaction identifier (promisified)', async () => {

        await client.getFlatTransactionById(transactionByIdRequest)
        assert(latestRequestSpy.calledOnce);
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetTransactionByIdRequest);
        const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetTransactionByIdRequest;
        expect(spiedRequest.getLedgerId()).to.equal(ledgerId);

    });

    it('should pass the correct ledger identifier to the ledger end endpoint', (done) => {

        client.getLedgerEnd((error, _response) => {
            expect(error).to.be.null;
            assert(latestRequestSpy.calledOnce);
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetLedgerEndRequest);
            const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetLedgerEndRequest;
            expect(spiedRequest.getLedgerId()).to.equal(ledgerId);
            done();
        });

    });

    it('should pass the correct ledger identifier to the ledger end endpoint (promisified)', async () => {

        await client.getLedgerEnd();
        assert(latestRequestSpy.calledOnce);
        expect(latestRequestSpy.lastCall.args).to.have.length(1);
        expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetLedgerEndRequest);
        const spiedRequest = latestRequestSpy.lastCall.lastArg as PbGetLedgerEndRequest;
        expect(spiedRequest.getLedgerId()).to.equal(ledgerId);

    });

    const invalidRequestGetTxById = {
        transactionId: 'some-tx-id',
        requestingParties: 42
    };

    const expectedValidationTreeGetTxById: ValidationTree = {
        errors: [],
        children: {
            transactionId: {
                errors: [],
                children: {}
            },
            requestingParties: {
                errors: [{
                    errorType: 'type-error',
                    expectedType: 'Array<string>',
                    actualType: 'number'
                }],
                children: {}
            }
        }
    };

    it('should perform validation on the GetTransactionById endpoint', (done) => {

        client.getTransactionById(invalidRequestGetTxById as unknown as GetTransactionByIdRequest, error => {
            expect(error).to.not.be.null;
            expect(JSON.parse(error!.message)).to.deep.equal(expectedValidationTreeGetTxById);
            done();
        });

    });

    it('should perform validation on the GetTransactionById endpoint (promisified)', async () => {

        let errorThrown = false;
        try {
            await client.getTransactionById(invalidRequestGetTxById as unknown as GetTransactionByIdRequest);
        } catch (error) {
            expect(JSON.parse(error.message)).to.deep.equal(expectedValidationTreeGetTxById);
            errorThrown = true;
        }
        assert(errorThrown, 'an error was expected but none has been thrown');

    });

    const invalidRequestGetFlatTxById = {
        transactionId: 'some-tx-id',
        requestingParties: 42
    };

    const expectedValidationTreeGetFlatTxById: ValidationTree = {
        errors: [],
        children: {
            transactionId: {
                errors: [],
                children: {}
            },
            requestingParties: {
                errors: [{
                    errorType: 'type-error',
                    expectedType: 'Array<string>',
                    actualType: 'number'
                }],
                children: {}
            }
        }
    };

    it('should perform validation on the GetFlatTransactionById endpoint', (done) => {

        client.getFlatTransactionById(invalidRequestGetFlatTxById as unknown as GetTransactionByIdRequest, error => {
            expect(error).to.not.be.null;
            expect(JSON.parse(error!.message)).to.deep.equal(expectedValidationTreeGetFlatTxById);
            done();
        });

    });

    it('should perform validation on the GetFlatTransactionById endpoint (promisified)', async () => {

        let errorThrown = false;
        try {
            await client.getFlatTransactionById(invalidRequestGetFlatTxById as unknown as GetTransactionByIdRequest);
        } catch (error) {
            expect(JSON.parse(error.message)).to.deep.equal(expectedValidationTreeGetFlatTxById);
            errorThrown = true;
        }
        assert(errorThrown, 'an error was expected but none has been thrown');

    });

    const invalidRequestGetTxByEvent = {
        eventId: 'some-event-id',
        requestingParties: 42
    };

    const expectedValidationTreeGetTxByEvent: ValidationTree = {
        errors: [],
        children: {
            eventId: {
                errors: [],
                children: {}
            },
            requestingParties: {
                errors: [{
                    errorType: 'type-error',
                    expectedType: 'Array<string>',
                    actualType: 'number'
                }],
                children: {}
            }
        }
    };

    it('should perform validation on the GetTransactionByEventId endpoint', (done) => {

        client.getTransactionByEventId(invalidRequestGetTxByEvent as unknown as GetTransactionByEventIdRequest, error => {
            expect(error).to.not.be.null;
            expect(JSON.parse(error!.message)).to.deep.equal(expectedValidationTreeGetTxByEvent);
            done();
        });

    });

    it('should perform validation on the GetTransactionByEventId endpoint (promisified)', async () => {

        let errorThrown = false;
        try {
            await client.getTransactionByEventId(invalidRequestGetTxByEvent as unknown as GetTransactionByEventIdRequest);
        } catch (error) {
            expect(JSON.parse(error.message)).to.deep.equal(expectedValidationTreeGetTxByEvent);
            errorThrown = true;
        }
        assert(errorThrown, 'an error was expected but none has been thrown');

    });

    const invalidRequestGetFlatTxByEvent = {
        eventId: 'some-event-id',
        requestingParties: 42
    };

    const expectedValidationTreeGetFlatTxByEvent: ValidationTree = {
        errors: [],
        children: {
            eventId: {
                errors: [],
                children: {}
            },
            requestingParties: {
                errors: [{
                    errorType: 'type-error',
                    expectedType: 'Array<string>',
                    actualType: 'number'
                }],
                children: {}
            }
        }
    };

    it('should perform validation on the GetFlatTransactionByEventId endpoint', (done) => {

        client.getFlatTransactionByEventId(invalidRequestGetFlatTxByEvent as unknown as GetTransactionByEventIdRequest, error => {
            expect(error).to.not.be.null;
            expect(JSON.parse(error!.message)).to.deep.equal(expectedValidationTreeGetFlatTxByEvent);
            done();
        });

    });

    it('should perform validation on the GetFlatTransactionByEventId endpoint (promisified)', async () => {

        let errorThrown = false;
        try {
            await client.getFlatTransactionByEventId(invalidRequestGetFlatTxByEvent as unknown as GetTransactionByEventIdRequest);
        } catch (error) {
            expect(JSON.parse(error.message)).to.deep.equal(expectedValidationTreeGetFlatTxByEvent);
            errorThrown = true;
        }
        assert(errorThrown, 'an error was expected but none has been thrown');

    });

    it('should perform validation on the GetTransactions endpoint', (done) => {

        const invalidTransactionsRequest = {
            begin: {
                absolute: '42',
                boundary: LedgerOffsetBoundaryValue.BEGIN
            },
            filter: {
                filtersByParty: {}
            }
        };

        const expectedValidationTree: ValidationTree = {
            errors: [],
            children: {
                begin: {
                    errors: [{
                        errorType: 'missing-type-tag',
                        expectedTypeTags: ['absolute', 'boundary']
                    }],
                    children: {}
                },
                filter: {
                    errors: [],
                    children: {
                        filtersByParty: {
                            errors: [],
                            children: {}
                        }
                    }
                }
            }
        };

        let passed = false;
        const call = client.getTransactions(invalidTransactionsRequest as any as GetTransactionsRequest);
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

    it('should perform validation on the GetTransactionTrees', (done) => {

        const invalidTransactionsRequest = {
            begin: {
                absolute: '42',
                boundary: LedgerOffsetBoundaryValue.BEGIN
            },
            filter: {
                filtersByParty: {}
            }
        };

        const expectedValidationTree: ValidationTree = {
            errors: [],
            children: {
                begin: {
                    errors: [{
                        errorType: 'missing-type-tag',
                        expectedTypeTags: ['absolute', 'boundary']
                    }],
                    children: {}
                },
                filter: {
                    errors: [],
                    children: {
                        filtersByParty: {
                            errors: [],
                            children: {}
                        }
                    }
                }
            }
        };

        let passed = false;
        const call = client.getTransactionTrees(invalidTransactionsRequest as any as GetTransactionsRequest);
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
