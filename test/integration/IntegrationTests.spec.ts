// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as fs from 'fs';
import {expect} from 'chai';
import {DamlLedgerClient} from "../../src/client/DamlLedgerClient";
import {LedgerClient} from "../../src/client/LedgerClient";
import {GetActiveContractsResponse} from "../../src/model/GetActiveContractsResponse";
import {GetTransactionsResponse} from "../../src/model/GetTransactionsResponse";
import {LedgerOffsetBoundaryValue} from "../../src/model/LedgerOffset";
import {v4 as uuid} from "uuid";
import {daml, GetTransactionTreesResponse, SubmitAndWaitRequest} from "../../lib";

const packageId: string = fs.readFileSync(`${__dirname}/IntegrationTests-0.0.0.sha256`, { encoding: 'UTF8'}).replace(/\n$/, '');

describe("Integration tests", () => {

    it("should successfully contact the server and get back a ledger identifier", (done) => {
        withLedgerClient((client) => {
            client.ledgerIdentityClient.getLedgerIdentity((error, response) => {
                expect(error).to.be.null;
                expect(response).to.not.be.null;
                if (response) {
                    expect(response).to.haveOwnProperty('ledgerId');
                    expect(response.ledgerId).to.be.a('string');
                }
                done();
            });
        });
    });

    it('should receive the active contracts as they are set up when the ledger starts', (done) => {
        withLedgerClient((client) => {
            let responses = 0;
            const activeContracts = client.activeContractsClient.getActiveContracts({
                filter: {
                    filtersByParty: {
                        Alice: {},
                        Bob: {}
                    }
                }
            });
            activeContracts.on('error', (error) => {
                done(error);
            });
            activeContracts.on('data', (data) => {
                responses += 1;
                expect((data as GetActiveContractsResponse).activeContracts).to.be.empty;
            });
            activeContracts.on('end', () => {
                expect(responses).to.equal(1, `expected exactly 1 response, got ${responses}`);
                done();
            });
        });
    });

    it('should get a non-empty list of packages when asked', (done) => {
        withLedgerClient((client) => {
            client.packageClient.listPackages((error, response) => {
                expect(error).to.be.null;
                expect(response).to.not.be.null;
                if (response) {
                    expect(response.packageIds).to.not.be.empty;
                }
                done();
            });
        });
    });

    function commands(): SubmitAndWaitRequest {
        return {
            commands: {
                applicationId: 'ActiveContractsClientIntegrationTests',
                commandId: uuid(),
                workflowId: 'IntegrationTests',
                ledgerEffectiveTime: {seconds: 0, nanoseconds: 0},
                maximumRecordTime: {seconds: 5, nanoseconds: 0},
                party: 'Alice',
                list: [
                    {
                        commandType: 'create' as 'create',
                        templateId: {
                            packageId: packageId,
                            moduleName: 'IntegrationTests',
                            entityName: 'Ping'
                        },
                        arguments: {
                            fields: {
                                sender: {valueType: 'party' as 'party', party: 'Alice'},
                                receiver: {valueType: 'party' as 'party', party: 'Bob'},
                                count: {valueType: 'int64' as 'int64', int64: '0'}
                            }
                        }
                    }
                ]
            }
        }
    }

    it('should successfully submit and wait for a command', (done) => {
        withLedgerClient((client) => {
            client.commandClient.submitAndWait(commands(), (error) => {
                expect(error).to.be.null;
                done();
            });
        });
    });

    it('should successfully submit and wait for a transaction identifier', (done) => {
        withLedgerClient((client) => {
            client.commandClient.submitAndWaitForTransactionId(commands(), (error, response) => {
                expect(error).to.be.null;
                expect(response).to.not.be.null;
                expect(response!.transactionId).to.be.a('string');
                done();
            });
        });
    });

    it('should successfully submit and wait for a transaction', (done) => {
        withLedgerClient((client) => {
            client.commandClient.submitAndWaitForTransaction(commands(), (error, response) => {
                expect(error).to.be.null;
                expect(response).to.not.be.null;
                expect(response!.transaction).to.not.be.null;
                done();
            });
        });
    });

    it('should successfully submit and wait for a transaction tree', (done) => {
        withLedgerClient((client) => {
            client.commandClient.submitAndWaitForTransactionTree(commands(), (error, response) => {
                expect(error).to.be.null;
                expect(response).to.not.be.null;
                expect(response!.transaction).to.not.be.null;
                done();
            });
        });
    });

    it('should see at least one transaction when subscribing from the beginning', (done) => {
        withLedgerClient((client) => {
            const transactions = client.transactionClient.getTransactions({
                begin: {offsetType: 'boundary', boundary: LedgerOffsetBoundaryValue.BEGIN},
                end: {offsetType: 'boundary', boundary: LedgerOffsetBoundaryValue.END},
                filter: {filtersByParty: {Alice: {}}}
            });
            let txs = 0;
            transactions.on('error', error => done(error));
            transactions.on('data', data => {
                expect(data).to.not.be.null;
                expect((data as GetTransactionsResponse).transactions).to.not.be.empty;
                txs += 1;
            });
            transactions.on('end', () => {
                expect(txs).to.be.greaterThan(0);
                done();
            });
        });
    });

    it('should correctly submit commands to the submission endpoint', (done) => {
        withLedgerClient(client => {
            client.commandSubmissionClient.submit(commands(), (error) => {
                expect(error).to.be.null;
                done();
            });
        });
    });

    it('should be able to set the time as expected', (done) => {
        withLedgerClient(client => {
            client.timeClient.setTime({
                currentTime: {seconds: 0, nanoseconds: 0},
                newTime: {seconds: 1, nanoseconds: 0}
            }, (error) => {
                expect(error).to.be.null;
                client.timeClient.setTime({
                    currentTime: {seconds: 1, nanoseconds: 0},
                    newTime: {seconds: 0, nanoseconds: 0}
                }, (error) => {
                    expect(error).to.not.be.null;
                    done();
                });
            });
        });
    });

    it('should work with the reset client as expected', (done) => {
        withLedgerClient(client => {
            client.resetClient.reset((error) => {
                expect(error).to.be.null;
                setTimeout(() => {
                    withLedgerClient(resetClient => {
                        const transactions = resetClient.transactionClient.getTransactions({
                            begin: {offsetType: 'boundary', boundary: LedgerOffsetBoundaryValue.BEGIN},
                            end: {offsetType: 'boundary', boundary: LedgerOffsetBoundaryValue.END},
                            filter: {filtersByParty: {Alice: {}}}
                        });
                        let txs = 0;
                        transactions.on('error', error => done(error));
                        transactions.on('data', data => {
                            expect(data).to.not.be.null;
                            expect((data as GetTransactionsResponse).transactions).to.not.be.empty;
                            txs += 1;
                        });
                        transactions.on('end', () => {
                            expect(txs).to.equal(0);
                            done();
                        });
                    });
                }, 1800);
            });
        });
    });

    it('should be able to retrieve and set parties as expected', (done) => {
        withLedgerClient(client => {
            client.partyManagementClient.listKnownParties((error, firstPartiesResponse) => {
                expect(error).to.be.null;
                expect(firstPartiesResponse!.partyDetails).to.be.empty;
                client.partyManagementClient.allocateParty({}, (error, allocatePartyResponse) => {
                    expect(error).to.be.null;
                    const allocatedParty = allocatePartyResponse!.partyDetails;
                    client.partyManagementClient.listKnownParties((error, secondPartiesResponse) => {
                        expect(error).to.be.null;
                        expect(secondPartiesResponse!.partyDetails).to.have.length(1);
                        expect(secondPartiesResponse!.partyDetails[0]).to.deep.equal(allocatedParty);
                        done();
                    });
                })
            });
        });
    });

    function createContractKeys(arg: {owner: string, n: number }): SubmitAndWaitRequest {
        return {
            commands: {
                applicationId: 'ActiveContractsClientIntegrationTests',
                commandId: `${arg.owner}-${arg.n}`,
                workflowId: 'IntegrationTests',
                ledgerEffectiveTime: {seconds: 0, nanoseconds: 0},
                maximumRecordTime: {seconds: 5, nanoseconds: 0},
                party: arg.owner,
                list: [
                    {
                        commandType: 'create' as 'create',
                        templateId: {
                            packageId: packageId,
                            moduleName: 'IntegrationTests',
                            entityName: 'ContractKeys'
                        },
                        arguments: {
                            fields: {
                                owner: {valueType: 'party' as 'party', party: arg.owner},
                                n: {valueType: 'int64', int64: arg.n.toString()},
                            }
                        }
                    }
                ]
            }
        }
    }

    it('should have the expected fields in a transaction trees response', (done) => {
        withLedgerClient(client => {
            client.commandSubmissionClient.submit(createContractKeys({owner: 'ContractKeysOwner', n: 42}), (error) => {
                expect(error).to.be.null;
                const txs = client.transactionClient.getTransactionTrees({
                    begin: {offsetType: 'boundary', boundary: LedgerOffsetBoundaryValue.BEGIN},
                    end: {offsetType: 'boundary', boundary: LedgerOffsetBoundaryValue.END},
                    filter: {
                        filtersByParty: {
                            ContractKeysOwner: {}
                        }
                    }
                });
                txs.on('error', (error) => {
                    done(error);
                });
                txs.on('data', (data) => {
                    const trees = data as GetTransactionTreesResponse;
                    expect(trees.transactions).to.have.length(1);
                    expect(trees.transactions[0].rootEventIds).to.have.length(1);
                    const lonelyEventId = trees.transactions[0].rootEventIds[0];
                    const lonelyEvent = trees.transactions[0].eventsById[lonelyEventId];
                    expect(lonelyEvent.eventType).to.equal('created');
                    if (lonelyEvent.eventType === 'created') {
                        expect(lonelyEvent.contractKey).to.not.be.null;
                        const expectedKey =
                            daml.tuple([
                                daml.party('ContractKeysOwner'),
                                daml.int64(47),
                            ]);
                        expect(lonelyEvent.contractKey).to.deep.equal(expectedKey);
                    }
                    done();
                });
            });
        });
    });

});

const darToUpload = fs.readFileSync(`${__dirname}/src/uploadDar/.daml/dist/UploadDarIntegrationTests-0.0.0.dar`);
const tokenPackageId = fs.readFileSync(`${__dirname}/UploadDarIntegrationTests-0.0.0.sha256`, { encoding: 'UTF8'}).replace(/\n$/, '');

describe("Upload DAR integration test", () => {

    const commands = {
        commands: {
            applicationId: 'UploadDarIntegrationTests',
            commandId: uuid(),
            workflowId: 'IntegrationTests',
            ledgerEffectiveTime: {seconds: 0, nanoseconds: 0},
            maximumRecordTime: {seconds: 5, nanoseconds: 0},
            party: 'Alice',
            list: [
                {
                    commandType: 'create' as 'create',
                    templateId: {
                        packageId: tokenPackageId,
                        moduleName: 'CreateToken',
                        entityName: 'Token'
                    },
                    arguments: {
                        fields: {
                            issuer: {valueType: 'party' as 'party', party: 'Alice'},
                            owner: {valueType: 'party' as 'party', party: 'Bob'},
                            value: {valueType: 'int64' as 'int64', int64: '0'}
                        }
                    }
                }
            ]
        }
    };

    it('should be able to upload Dar file', (done) =>{
        const darToUploadInString = darToUpload.toString('base64');
        withLedgerClient((client) => {
            client.packageManagementClient.uploadDarFile({
                darFile: darToUploadInString
            });

            client.packageManagementClient.listKnownPackages((error, response) => {
                expect(error).to.be.null;

                const results = response!.packageDetailsList.map((item)=>{
                    return item.packageId;
                });

                expect(results.includes(tokenPackageId)).to.be.true;

                client.commandClient.submitAndWait(commands, (error) => {
                    expect(error).to.be.null;
                    done();
                });
            });
        });
    });
});

function withLedgerClient(callback: (client: LedgerClient) => void): void {
    DamlLedgerClient.connect({host: '0.0.0.0', port: parseInt(process.env['DAML_SANDBOX_PORT']!)}, (error, client) => {
        expect(error).to.be.null;
        expect(client).to.not.be.null;
        callback(client!);
    });
}
