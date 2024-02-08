// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {assert, expect} from 'chai';
import * as sinon from 'sinon';
import {NodeJsLedgerConfigurationClient} from "../../src/client/NodeJsLedgerConfigurationClient";
import {GetLedgerConfigurationRequest as PbGetLedgerConfigurationRequest} from "../../src/generated/com/daml/ledger/api/v1/ledger_configuration_service_pb";
import {DummyLedgerConfigurationServiceClient} from "./DummyLedgerConfigurationServiceClient";

describe('NodeJsLedgerConfigurationClient', () => {

    const ledgerId = 'cafebabe';
    const latestRequestSpy = sinon.spy();
    const dummy = new DummyLedgerConfigurationServiceClient(latestRequestSpy);
    const client = new NodeJsLedgerConfigurationClient(ledgerId, dummy);

    afterEach(() => {
        sinon.restore();
        latestRequestSpy.resetHistory();
    });

    it('should send the correct ledger identifier', (done) => {

        const call = client.getLedgerConfiguration();
        call.on('error', (error) => {
            done(error);
        });
        call.on('end', () => {
            assert(latestRequestSpy.calledOnce, 'The latestRequestSpy has not been called exactly once');
            expect(latestRequestSpy.lastCall.args).to.have.length(1);
            expect(latestRequestSpy.lastCall.lastArg).to.be.an.instanceof(PbGetLedgerConfigurationRequest);
            const request = latestRequestSpy.lastCall.lastArg as PbGetLedgerConfigurationRequest;
            expect(request.getLedgerId()).to.equal(ledgerId);
            done();
        });

    });

});