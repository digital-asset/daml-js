// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {assert, expect} from 'chai';
import {ClientReadableObjectStream} from "../../src/call/ClientReadableObjectStream";
import {IdentifierCodec} from "../../src/codec/IdentifierCodec";
import {Identifier as PbIdentifier} from "../../src/generated/com/digitalasset/ledger/api/v1/value_pb";
import {DummyClientReadableStream} from "./DummyClientReadableStream";

describe("ClientReadableObjectStream", () => {

    it("should support empty stream", (done) => {

        const wrapped = DummyClientReadableStream.with([]);
        const wrapper = ClientReadableObjectStream.from(wrapped, IdentifierCodec);

        let counter = 0;
        wrapper.on('data', (_id) => {
            counter = counter + 1;
        });

        wrapper.on('end', () => {
            expect(counter).to.equal(0);
            done();
        });

    });

    it("should read the expected items out of the wrapped stream", (done) => {

        const id1 = new PbIdentifier();
        id1.setModuleName('firstModuleName');
        id1.setEntityName('firstEntityName');
        id1.setPackageId('firstPackageId');
        const id2 = new PbIdentifier();
        id2.setModuleName('secondModuleName');
        id2.setEntityName('secondEntityName');
        id2.setPackageId('secondPackageId');

        const fixture = [id1, id2];

        const wrapped = DummyClientReadableStream.with(fixture);
        const wrapper = ClientReadableObjectStream.from(wrapped, IdentifierCodec);

        let counter = 0;
        wrapper.on('data', (id) => {
            expect(id).to.haveOwnProperty('moduleName');
            expect(id).to.haveOwnProperty('entityName');
            expect(id).to.haveOwnProperty('packageId');
            expect(id).to.deep.equal(IdentifierCodec.deserialize(fixture[counter]));
            counter = counter + 1;
        });

        wrapper.on('end', () => {
            expect(counter).to.equal(2);
            done();
        });

    });

    it('should correctly wrap an error', (done) => {
        const wrapper = ClientReadableObjectStream.from(new Error('hello, error'));
        let passed = false;
        wrapper.on('data', (_data) => {
            done(new Error('received unexpected data'));
        });
        wrapper.on('error', (error) => {
            expect(error.message).to.equal('hello, error');
            passed = true;
        });
        wrapper.on('end', () => {
            assert(passed);
            done();
        })
    });

});
