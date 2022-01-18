// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {test} from 'mocha';
import {expect} from 'chai';

import { daml } from '../../src';

describe('Value helpers', () => {
    test('unit is frozen', () => {
        expect(() => { daml.unit.valueType = 'unit'; }).to.throw;
    });
    test('none is frozen', () => {
        expect(() => { daml.none.valueType = 'optional'; }).to.throw;
    });
    test('decimal could loose precision when using JS numbers', () => {
        expect(daml.decimal(1981920982985903454234234)).
        to.have.property('decimal').
        that.does.not.equal('1981920982985903454234234');
    });
    test('decimal should left a string untouched', () => {
        expect(daml.decimal('1981920982985903454234234')).to.deep.equal({
            valueType: 'decimal',
            decimal: '1981920982985903454234234'
        });
    });
    test('int64 could loose precision when using JS numbers', () => {
        expect(daml.int64(1981920982985903454234234)).
        to.have.property('int64').
        that.does.not.equal('1981920982985903454234234');
    });
    test('int64 should left a string untouched', () => {
        expect(daml.int64('1981920982985903454234234')).to.deep.equal({
            valueType: 'int64',
            int64: '1981920982985903454234234'
        });
    });
    test('timestamp should return exactly 0 for the epoch', () => {
        expect(daml.timestamp(new Date(0))).to.deep.equal({
            valueType: 'timestamp',
            timestamp: '0'
        });
    });
    test('timestamp should return the correct number of microseconds from dates after epoch', () => {
        expect(daml.timestamp(new Date(77348998456))).to.deep.equal({
            valueType: 'timestamp',
            timestamp: '77348998456000'
        });
    });
    test('timestamp should return the correct number of microseconds from dates before epoch', () => {
        expect(daml.timestamp(new Date(-77348998456))).to.deep.equal({
            valueType: 'timestamp',
            timestamp: '-77348998456000'
        });
    });
    test('timestamp should be correctly parsed from dates in ISO 8601 compliant format', () => {
        expect(daml.timestamp(new Date('2019-05-22T06:43:42Z'))).to.deep.equal({
            valueType: 'timestamp',
            timestamp: '1558507422000000'
        });
    });
    test('timestamp should go through untouched when passed as a string', () => {
        expect(daml.timestamp('2019-05-22T06:43:42Z')).to.deep.equal({
            valueType: 'timestamp',
            timestamp: '2019-05-22T06:43:42Z' // this is correctly typed but will be an error at runtime
        });
    });
    test('dates should return the correct number of days from epoch', () => {
        expect(daml.date(new Date(0))).to.deep.equal({
            valueType: 'date',
            date: '0'
        });
    });
    test('dates should return the correct number of days from the millisecond after epoch, losing infra-day precision', () => {
        expect(daml.date(new Date(1))).to.deep.equal({
            valueType: 'date',
            date: '0'
        });
    });
    test('dates should return the correct number of days from the millisecond before epoch', () => {
        expect(daml.date(new Date(-1))).to.deep.equal({
            valueType: 'date',
            date: '-1'
        });
    });
    test('dates should return the correct number of days from two milliseconds before epoch, losing infra-day precision', () => {
        expect(daml.date(new Date(-2))).to.deep.equal({
            valueType: 'date',
            date: '-1'
        });
    });
    test('dates should return the correct number of microseconds from dates after epoch, losing infra-day precision', () => {
        expect(daml.date(new Date(86400000))).to.deep.equal({
            valueType: 'date',
            date: '1'
        });
    });
    test('dates should return the correct number of microseconds from dates before epoch, losing infra-day precision', () => {
        expect(daml.date(new Date(-86400000))).to.deep.equal({
            valueType: 'date',
            date: '-1'
        });
    });
    test('dates should return the correct number of microseconds from dates before epoch, losing infra-day precision', () => {
        expect(daml.date(new Date(-86400001))).to.deep.equal({
            valueType: 'date',
            date: '-2'
        });
    });
    test('dates should be correctly parsed from dates in ISO 8601 compliant format, after epoch, losing infra-day precision', () => {
        expect(daml.date(new Date('1970-01-02T06:43:42Z'))).to.deep.equal({
            valueType: 'date',
            date: '1'
        });
    });
    test('dates should be correctly parsed from dates in ISO 8601 compliant format, before epoch, losing infra-day precision', () => {
        expect(daml.date(new Date('1969-12-31T06:43:42Z'))).to.deep.equal({
            valueType: 'date',
            date: '-1'
        });
    });
    test('dates should go through untouched when passed as a string', () => {
        expect(daml.date('2019-05-22T06:43:42Z')).to.deep.equal({
            valueType: 'date',
            date: '2019-05-22T06:43:42Z' // this is correctly typed but will be an error at runtime
        });
    });
    test('a complex record should be turned in the expected underlying representation', () => {
        expect(
            daml.record({
                name: daml.text('sam'),
                age: daml.int64(42),
                dateOfBirth: daml.date(new Date('1971-01-01')),
                groceries: daml.list([daml.text('milk'), daml.text('apples')]),
                something: daml.some(daml.party('someone')),
                nothing: daml.none,
                relationships: daml.list([
                    daml.variant('Person', daml.record({ name: daml.text('kate') })),
                    daml.variant('Person', daml.record({ name: daml.text('jim') })),
                ]),
                capitals: daml.map({
                    'IT': daml.party('Rome'),
                    'CH': daml.party('Bern'),
                    'DE': daml.party('Berlin')
                }),
                effects: daml.unit
            })
        ).to.deep.equal({
            valueType: 'record',
            fields: {
                name: { valueType: 'text', text: 'sam' },
                age: { valueType: 'int64', int64: '42' },
                dateOfBirth: { valueType: 'date', date: '365' },
                groceries: {
                    valueType: 'list',
                    list: [
                        {valueType: 'text', text: 'milk'},
                        {valueType: 'text', text: 'apples'},
                    ]
                },
                something: { valueType: 'optional', optional: { valueType: 'party', party: 'someone' } },
                nothing: { valueType: 'optional' },
                relationships: {
                    valueType: 'list',
                    list: [
                        {
                            valueType: 'variant',
                            constructor: 'Person',
                            value: {
                                valueType: 'record',
                                fields: {
                                    name: { valueType: 'text', text: 'kate'}
                                }
                            }
                        },
                        {
                            valueType: 'variant',
                            constructor: 'Person',
                            value: {
                                valueType: 'record',
                                fields: {
                                    name: { valueType: 'text', text: 'jim'}
                                }
                            }
                        }
                    ]
                },
                capitals: {
                    valueType: 'map',
                    map: {
                        'IT': { valueType: 'party', party: 'Rome'},
                        'CH': { valueType: 'party', party: 'Bern'},
                        'DE': { valueType: 'party', party: 'Berlin'}
                    }
                },
                effects: { valueType: 'unit' }
            }
        });
    });
});