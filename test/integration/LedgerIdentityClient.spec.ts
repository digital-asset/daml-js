// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {expect} from 'chai';
import {LedgerIdentityClient} from "../../src/client/LedgerIdentityClient";
import {LedgerIdentityServiceClient as GrpcLedgerIdentityClient} from "../../src/generated/com/digitalasset/ledger/api/v1/ledger_identity_service_grpc_pb";
import {credentials} from "grpc";

describe("LedgerIdentityClient", () => {

    const grpcClient = new GrpcLedgerIdentityClient(`127.0.0.1:${process.env['DAML_SANDBOX_PORT']}`, credentials.createInsecure());
    const client = new LedgerIdentityClient(grpcClient);

    it("should successfully contact the server and get back a ledger identifier", (done) => {
        client.getLedgerIdentity((error, response) => {
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
