// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as fs from 'fs';
import {expect} from 'chai';
import {DamlLedgerClient} from "../../src/client/DamlLedgerClient";
import {LedgerClient} from "../../src/client/LedgerClient";
import {GetActiveContractsResponse} from "../../src/model/GetActiveContractsResponse";
import {GetTransactionsResponse} from "../../src/model/GetTransactionsResponse";
import {LedgerOffsetBoundaryValue} from "../../src/model/LedgerOffset";
import {v4 as uuid} from "uuid";
import {daml, lf, GetTransactionTreesResponse, SubmitAndWaitRequest} from "../../lib";

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

    function createPing(): SubmitAndWaitRequest {
        return {
            commands: {
                applicationId: 'ActiveContractsClientIntegrationTests',
                commandId: uuid(),
                workflowId: 'IntegrationTests',
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
            client.commandClient.submitAndWait(createPing(), (error) => {
                expect(error).to.be.null;
                done();
            });
        });
    });

    it('should successfully submit and wait for a transaction identifier', (done) => {
        withLedgerClient((client) => {
            client.commandClient.submitAndWaitForTransactionId(createPing(), (error, response) => {
                expect(error).to.be.null;
                expect(response).to.not.be.null;
                expect(response!.transactionId).to.be.a('string');
                done();
            });
        });
    });

    it('should successfully submit and wait for a transaction', (done) => {
        withLedgerClient((client) => {
            client.commandClient.submitAndWaitForTransaction(createPing(), (error, response) => {
                expect(error).to.be.null;
                expect(response).to.not.be.null;
                expect(response!.transaction).to.not.be.null;
                done();
            });
        });
    });

    it('should successfully submit and wait for a transaction tree', (done) => {
        withLedgerClient((client) => {
            client.commandClient.submitAndWaitForTransactionTree(createPing(), (error, response) => {
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
            client.commandSubmissionClient.submit(createPing(), (error) => {
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

    function createContractKeys(arg: {owner: string, n: number, color: string }): SubmitAndWaitRequest {
        return {
            commands: {
                applicationId: 'ActiveContractsClientIntegrationTests',
                commandId: `${arg.owner}-${arg.n}`,
                workflowId: 'IntegrationTests',
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
                                color: {valueType: 'enum', constructor: arg.color}
                            }
                        }
                    }
                ]
            }
        }
    }

    it('should have the expected fields in a transaction trees response', (done) => {
        withLedgerClient(client => {
            client.commandClient.submitAndWait(createContractKeys({owner: 'ContractKeysOwner', n: 42, color: 'Red'}), (error) => {
                let receivedData = 0;
                expect(error).to.be.null;
                const txs = client.transactionClient.getTransactionTrees({
                    begin: {offsetType: 'boundary', boundary: LedgerOffsetBoundaryValue.BEGIN},
                    end: {offsetType: 'boundary', boundary: LedgerOffsetBoundaryValue.END},
                    filter: {
                        filtersByParty: {
                            ContractKeysOwner: {}
                        }
                    },
                    verbose: false
                });
                txs.on('error', (error) => {
                    done(error);
                });
                txs.on('data', (data) => {
                    receivedData++;
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
                        expect(lonelyEvent.signatories).to.deep.equal(['ContractKeysOwner']);
                        expect(lonelyEvent.observers).to.be.empty;
                        expect(lonelyEvent.arguments.fields).to.deep.equal({
                            0: daml.party('ContractKeysOwner'),
                            1: daml.int64(42),
                            2: daml.enum('Red')
                        });
                    }
                    done();
                });
                txs.on('end', () => {
                    if (receivedData < 1) {
                        done('no data received');
                    }
                });
            });
        });
    });

    it('should allow to freely set gRPC options', (done) => {
        // Set the receive message threshold to 1KB, which should be way less than the compressed DAR size for integration tests (~30KB)
        withConfiguredLedgerClient({'grpc.max_receive_message_length': 1024 }, client => {
            client.packageClient.getPackage(packageId, (error, response) => {
                expect(response).to.be.undefined;
                expect(error).to.not.be.null.and.to.not.be.undefined;
                expect(error!.message).to.contain('RESOURCE_EXHAUSTED');
                done();
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

    it('should be able to upload a DAR file', (done) =>{
        const darToUploadInString = darToUpload.toString('base64');
        withLedgerClient((client) => {
            client.packageManagementClient.uploadDarFile({
                darFile: darToUploadInString
            });

            // Allow 1s for the PackageManagementService to index the newly uploaded package
            setTimeout(() => {

                client.packageManagementClient.listKnownPackages((error, response) => {
                    expect(error).to.be.null;

                    const results = response!.packageDetailsList.map((item)=>{
                        return item.packageId;
                    });

                    expect(results).to.contain(tokenPackageId);

                    client.commandClient.submitAndWait(commands, (error) => {
                        expect(error).to.be.null;
                        done();
                    });
                });

            }, 1000);

        });
    });
});

describe('Template identifier retrieval', () => {

    function getTemplateIds(archivePayload: string): string[] {
        const templateNames: string[] = [];
        const archive = lf.ArchivePayload.deserializeBinary(archivePayload as unknown as Uint8Array).getDamlLf1()!;
        for (const damlModule of archive.getModulesList()) {
            if (damlModule.hasNameDname()) {
                const moduleName = damlModule.getNameDname()!.getSegmentsList().join('.');
                for (const template of damlModule.getTemplatesList()) {
                    expect(template.hasTyconDname()).to.be.true;
                    const templateName = template.getTyconDname()!.getSegmentsList().join('.');
                    templateNames.push(`${moduleName}:${templateName}`);
                }
            } else if (damlModule.hasNameInternedDname()) {
                const internedDottedNames = archive.getInternedDottedNamesList();
                const internedStrings = archive.getInternedStringsList();
                const i = damlModule.getNameInternedDname();
                const moduleName = internedDottedNames[i].getSegmentsInternedStrList().map(j => internedStrings[j]).join('.');
                for (const template of damlModule.getTemplatesList()) {
                    expect(template.hasTyconInternedDname()).to.be.true;
                    const k = template.getTyconInternedDname();
                    const templateName = internedDottedNames[k].getSegmentsInternedStrList().map(l => internedStrings[l]).join('.');
                    templateNames.push(`${moduleName}:${templateName}`);
                }
            }
        }
        return templateNames;
    }

    it('should allow to dynamically look up for template identifiers regardless the DAML-LF version of a package', (done) => {
        withLedgerClient(client => {
            client.packageClient.listPackages((error, response) => {
                expect(error).to.be.null;
                expect(response).to.not.be.null.and.to.not.be.undefined;
                expect(response!.packageIds).to.not.be.empty;
                expect(response!.packageIds).to.contain(packageId).and.to.contain(tokenPackageId);
                client.packageClient.getPackage(packageId, (error, response) => {
                    expect(error).to.be.null;
                    expect(getTemplateIds(response!.archivePayload).sort()).to.deep.equal(['IntegrationTests:Ping', 'IntegrationTests:Pong', 'IntegrationTests:ContractKeys'].sort());
                    client.packageClient.getPackage(tokenPackageId, (error, response) => {
                        expect(error).to.be.null;
                        expect(getTemplateIds(response!.archivePayload).sort()).to.deep.equal(['CreateToken:Token'].sort());
                        done();
                    })
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

function withConfiguredLedgerClient(grpcOptions: object, callback: (client: LedgerClient) => void): void {
    DamlLedgerClient.connect({host: '0.0.0.0', port: parseInt(process.env['DAML_SANDBOX_PORT']!), grpcOptions: grpcOptions}, (error, client) => {
        expect(error).to.be.null;
        expect(client).to.not.be.null;
        callback(client!);
    });
}
