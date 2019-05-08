// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ServerCredentials} from 'grpc';
import {expect} from 'chai';
import * as sinon from 'sinon';
import {DamlLedgerClient} from "../../src/client/DamlLedgerClient";
import {DummyServer} from "../client/DummyServer";

describe('End-to-end stream', () => {

    const ledgerId = 'cafebabe';

    const server = new DummyServer(ledgerId, sinon.spy());
    const port = server.bind('0.0.0.0:0', ServerCredentials.createInsecure());

    before(() => {
        server.start();
    });

    after(() => {
        server.forceShutdown();
    });

    it('should correctly communicate end-to-end', (done) => {
        DamlLedgerClient.connect({host: '0.0.0.0', port: port}, (error, client) => {
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
    })

});