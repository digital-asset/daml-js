// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {expect} from 'chai';
import * as sinon from 'sinon';
import {ServerCredentials} from '@grpc/grpc-js';
import {ClientCertChain, ClientPrivateKey, RootCertChain, ServerCertChain, ServerPrivateKey} from '../ssl'
import {DamlLedgerClient} from "../../src";
import {DummyServer} from "../client/DummyServer";

describe("End-to-end SSL support", () => {

    const ledgerId = 'cafebabe';

    const serverCredentials = ServerCredentials.createSsl(RootCertChain, [{
        cert_chain: ServerCertChain,
        private_key: ServerPrivateKey
    }], true);

    const server = new DummyServer(ledgerId, sinon.spy());
    let port: any = undefined;


    before((done) => {
        server.bindAsync('localhost:0', serverCredentials, (err, actualPort) => {
            if (err) {
                return done(err);
            }
            port = actualPort;
            server.start();
            done();
        });
    });

    after(() => {
        server.forceShutdown();
    });

    it('should refuse connections from insecure clients', (done) => {
        DamlLedgerClient.connect({host: 'localhost', port: port}, (error, _) => {
            expect(error).to.not.be.null;
            done();
        });
    });

    it('should refuse connections from client providing an incomplete set of certificates', (done) => {
        DamlLedgerClient.connect({
            host: 'localhost',
            port: port,
            certChain: ClientCertChain,
            privateKey: ClientPrivateKey
        }, (error, _) => {
            expect(error).to.not.be.null;
            done();
        });
    });

    it('should accept a connection from a secure client, have the correct ledgerId', (done) => {
        DamlLedgerClient.connect({
            host: 'localhost',
            port: port,
            rootCerts: RootCertChain,
            certChain: ClientCertChain,
            privateKey: ClientPrivateKey
        }, (error, client) => {
            expect(error).to.be.null;
            expect(client!.ledgerId).to.equal(ledgerId);
            done();
        });
    });

    it('should accept a connection from a secure client', (done) => {
        DamlLedgerClient.connect({
            host: 'localhost',
            port: port,
            rootCerts: RootCertChain,
            certChain: ClientCertChain,
            privateKey: ClientPrivateKey
        }, (error, client) => {
            expect(error).to.be.null;
            const call = client!.transactionClient.getTransactions({
                filter: {filtersByParty: {}},
                begin: {offsetType: 'absolute', absolute: '0'}
            });
            call.on('error', (error) => {
                done(error);
            });
            call.on('end', () => {
                done();
            });
        });
    });

});

