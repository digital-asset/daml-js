// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {assert, expect} from 'chai';
import * as sinon from 'sinon';
import {ServerCredentials} from 'grpc';
import {DamlLedgerClient} from "../../src";
import {DummyServer} from "./DummyServer";

describe("DamlLedgerClient", () => {

    const ledgerId = 'cafebabe';

    const spy = sinon.spy();
    const server = new DummyServer(ledgerId, spy);
    const port = server.bind('0.0.0.0:0', ServerCredentials.createInsecure());

    const emptyCommands = {
        commands: {
            applicationId: '',
            commandId: '', party: '',
            ledgerEffectiveTime: {seconds: 0, nanoseconds: 0},
            maximumRecordTime: {seconds: 0, nanoseconds: 0},
            list: []
        }
    };

    before(() => {
        server.start();
    });

    after(() => {
        server.forceShutdown();
    });

    beforeEach(() => {
        spy.resetHistory();
        sinon.restore();
    });

    it('should properly initialize the ledgerId', (done) => {
        DamlLedgerClient.connect({host: '0.0.0.0', port: port}, (error, client) => {
            expect(error).to.be.null;
            expect(client!.ledgerId).to.equal(ledgerId);
            done();
        });
    });

    it('should correctly set the ledgerId of the ActiveContractService', (done) => {
        DamlLedgerClient.connect({host: '0.0.0.0', port: port}, (error, client) => {
            expect(error).to.be.null;
            const call = client!.activeContractsClient.getActiveContracts({
                verbose: true,
                filter: {filtersByParty: {}}
            });
            call.on('end', () => {
                expect(spy.calledOnceWithExactly(ledgerId)).to.be.true
                done();
            });
        });
    });

    it('should correctly set the ledgerId of the CommandService', (done) => {
        DamlLedgerClient.connect({host: '0.0.0.0', port: port}, (error, client) => {
            expect(error).to.be.null;
            client!.commandClient.submitAndWait(emptyCommands, (error, _) => {
                expect(error).to.be.null;
                assert(spy.calledOnceWithExactly(ledgerId));
                done();
            });
        });
    });

    it('should correctly set the ledgerId of the CommandCompletionService (completionStream)', (done) => {
        DamlLedgerClient.connect({host: '0.0.0.0', port: port}, (error, client) => {
            expect(error).to.be.null;
            const call = client!.commandCompletionClient.completionStream({
                applicationId: '',
                offset: {__type__:'absolute',absolute: '0'},
                parties: []
            });
            call.on('end', () => {
                expect(spy.calledOnceWithExactly(ledgerId)).to.be.true
                done();
            });
        });
    });

    it('should correctly set the ledgerId of the CommandCompletionService (completionEnd)', (done) => {
        DamlLedgerClient.connect({host: '0.0.0.0', port: port}, (error, client) => {
            expect(error).to.be.null;
            client!.commandCompletionClient.completionEnd((error, _) => {
                expect(error).to.be.null;
                assert(spy.calledOnceWithExactly(ledgerId));
                done();
            });
        })
    });

    it('should correctly set the ledgerId of the CommandSubmissionService', (done) => {
        DamlLedgerClient.connect({host: '0.0.0.0', port: port}, (error, client) => {
            expect(error).to.be.null;
            client!.commandSubmissionClient.submit(emptyCommands, (error, _) => {
                expect(error).to.be.null;
                assert(spy.calledOnceWithExactly(ledgerId));
                done();
            });
        });
    });

    it('should correctly set the ledgerId of the PackageService (listPackages)', (done) => {
        DamlLedgerClient.connect({host: '0.0.0.0', port: port}, (error, client) => {
            expect(error).to.be.null;
            client!.packageClient.listPackages((error, _) => {
                expect(error).to.be.null;
                assert(spy.calledOnceWithExactly(ledgerId));
                done();
            });
        });
    });

    it('should correctly set the ledgerId of the PackageService (getPackage)', (done) => {
        DamlLedgerClient.connect({host: '0.0.0.0', port: port}, (error, client) => {
            expect(error).to.be.null;
            client!.packageClient.getPackage('', (error, _) => {
                expect(error).to.be.null;
                assert(spy.calledOnceWithExactly(ledgerId));
                done();
            });
        });
    });

    it('should correctly set the ledgerId of the PackageService (getPackageStatus)', (done) => {
        DamlLedgerClient.connect({host: '0.0.0.0', port: port}, (error, client) => {
            expect(error).to.be.null;
            client!.packageClient.getPackageStatus('', (error, _) => {
                expect(error).to.be.null;
                assert(spy.calledOnceWithExactly(ledgerId));
                done();
            });
        });
    });

    it('should correctly set the ledgerId of the LedgerConfigurationService', (done) => {
        DamlLedgerClient.connect({host: '0.0.0.0', port: port}, (error, client) => {
            expect(error).to.be.null;
            const call = client!.ledgerConfigurationClient.getLedgerConfiguration()
            call.on('end', () => {
                assert(spy.calledOnceWithExactly(ledgerId));
                done();
            });
        });
    });

    it('should correctly set the ledgerId of the TransactionsClient (getLedgerEnd)', (done) => {
        DamlLedgerClient.connect({host: '0.0.0.0', port: port}, (error, client) => {
            expect(error).to.be.null;
            client!.transactionClient.getLedgerEnd((error, _) => {
                expect(error).to.be.null;
                assert(spy.calledOnceWithExactly(ledgerId));
                done();
            });
        });
    });

    it('should correctly set the ledgerId of the TransactionsClient (getTransactionByEventId)', (done) => {
        DamlLedgerClient.connect({host: '0.0.0.0', port: port}, (error, client) => {
            expect(error).to.be.null;
            client!.transactionClient.getTransactionByEventId({eventId: '', requestingParties: []}, (error, _) => {
                expect(error).to.be.null;
                assert(spy.calledOnceWithExactly(ledgerId));
                done();
            });
        });
    });

    it('should correctly set the ledgerId of the TransactionsClient (getTransactionById)', (done) => {
        DamlLedgerClient.connect({host: '0.0.0.0', port: port}, (error, client) => {
            expect(error).to.be.null;
            client!.transactionClient.getTransactionById({transactionId: '', requestingParties: []}, (error, _) => {
                expect(error).to.be.null;
                assert(spy.calledOnceWithExactly(ledgerId));
                done();
            });
        });
    });

    it('should correctly set the ledgerId of the TransactionsClient (getTransactions)', (done) => {
        DamlLedgerClient.connect({host: '0.0.0.0', port: port}, (error, client) => {
            expect(error).to.be.null;
            const call = client!.transactionClient.getTransactions({
                filter: {filtersByParty: {}},
                begin: {__type__:'absolute',absolute: '0'}
            })
            call.on('end', () => {
                assert(spy.calledOnceWithExactly(ledgerId));
                done();
            });
        });
    });

    it('should correctly set the ledgerId of the TransactionsClient (getTransactionTrees)', (done) => {
        DamlLedgerClient.connect({host: '0.0.0.0', port: port}, (error, client) => {
            expect(error).to.be.null;
            const call = client!.transactionClient.getTransactionTrees({
                filter: {filtersByParty: {}},
                begin: {__type__:'absolute',absolute: '0'}
            })
            call.on('end', () => {
                assert(spy.calledOnceWithExactly(ledgerId));
                done();
            });
        });
    });

    it('should correctly set the ledgerId of the TimeClient (getTime)', (done) => {
        DamlLedgerClient.connect({host: '0.0.0.0', port: port}, (error, client) => {
            expect(error).to.be.null;
            const call = client!.timeClient.getTime();
            call.on('end', () => {
                assert(spy.calledOnceWithExactly(ledgerId));
                done();
            });
        });
    });

    it('should correctly set the ledgerId of the TimeClient (setTime)', (done) => {
        DamlLedgerClient.connect({host: '0.0.0.0', port: port}, (error, client) => {
            expect(error).to.be.null;
            client!.timeClient.setTime({
                currentTime: {seconds: 0, nanoseconds: 0},
                newTime: {seconds: 0, nanoseconds: 1}
            }, (error, _) => {
                expect(error).to.be.null;
                assert(spy.calledOnceWithExactly(ledgerId));
                done();
            });
        });
    });

    it('should correctly set the ledgerId of the ResetClient', (done) => {
        DamlLedgerClient.connect({host: '0.0.0.0', port: port}, (error, client) => {
            expect(error).to.be.null;
            client!.resetClient.reset((error, _) => {
                expect(error).to.be.null;
                assert(spy.calledOnceWithExactly(ledgerId));
                done();
            });
        });
    });

});
