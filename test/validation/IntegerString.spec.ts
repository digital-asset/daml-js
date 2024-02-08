// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {expect} from 'chai';
import {ValidationTree} from "../../src/validation/Validation";
import {integerString} from "../../src/validation/IntegerString";

describe('Validation: IntegerString', () => {

    it('should validate 0 correctly', () => {
        const expected: ValidationTree = {
            errors: [],
            children: {}
        };
        expect(integerString.validate('0')).to.deep.equal(expected);
    });

    it('should validate -0 correctly', () => {
        const expected: ValidationTree = {
            errors: [],
            children: {}
        };
        expect(integerString.validate('-0')).to.deep.equal(expected);
    });

    it('should validate +0 correctly', () => {
        const expected: ValidationTree = {
            errors: [],
            children: {}
        };
        expect(integerString.validate('+0')).to.deep.equal(expected);
    });

    it('should accept leading zeroes correctly', () => {
        const expected: ValidationTree = {
            errors: [],
            children: {}
        };
        expect(integerString.validate('042')).to.deep.equal(expected);
    });

    it('should validate a positive integer correctly', () => {
        const expected: ValidationTree = {
            errors: [],
            children: {}
        };
        expect(integerString.validate('42')).to.deep.equal(expected);
    });

    it('should validate a positive integer with sign correctly', () => {
        const expected: ValidationTree = {
            errors: [],
            children: {}
        };
        expect(integerString.validate('+42')).to.deep.equal(expected);
    });

    it('should validate a negative integer correctly', () => {
        const expected: ValidationTree = {
            errors: [],
            children: {}
        };
        expect(integerString.validate('-42')).to.deep.equal(expected);
    });

    it('should validate a very large positive integer correctly', () => {
        const expected: ValidationTree = {
            errors: [],
            children: {}
        };
        expect(integerString.validate('423498374589374875398456346')).to.deep.equal(expected);
    });

    it('should validate a very large negative integer correctly', () => {
        const expected: ValidationTree = {
            errors: [],
            children: {}
        };
        expect(integerString.validate('-423498374589374875398456346')).to.deep.equal(expected);
    });

    it('should accept leading zeroes in a positive number', () => {
        const expected: ValidationTree = {
            errors: [],
            children: {}
        };
        expect(integerString.validate('042')).to.deep.equal(expected);
    });

    it('should accept leading zeroes in a negative number', () => {
        const expected: ValidationTree = {
            errors: [],
            children: {}
        };
        expect(integerString.validate('-042')).to.deep.equal(expected);
    });

    it('should accept leading zeroes in a positive number with sign', () => {
        const expected: ValidationTree = {
            errors: [],
            children: {}
        };
        expect(integerString.validate('+042')).to.deep.equal(expected);
    });

    it('should reject a minus sign in a non-leading place', () => {
        const expected: ValidationTree = {
            errors: [{
                errorType: 'invalid-integer-string',
                actualValue: '0-42'
            }],
            children: {}
        };
        expect(integerString.validate('0-42')).to.deep.equal(expected);
    });

    it('should reject a minus sign in a non-leading place', () => {
        const expected: ValidationTree = {
            errors: [{
                errorType: 'invalid-integer-string',
                actualValue: '0+42'
            }],
            children: {}
        };
        expect(integerString.validate('0+42')).to.deep.equal(expected);
    });

    it('should reject a minus sign in a trailing place', () => {
        const expected: ValidationTree = {
            errors: [{
                errorType: 'invalid-integer-string',
                actualValue: '42-'
            }],
            children: {}
        };
        expect(integerString.validate('42-')).to.deep.equal(expected);
    });

    it('should reject a plus sign in a trailing place', () => {
        const expected: ValidationTree = {
            errors: [{
                errorType: 'invalid-integer-string',
                actualValue: '42+'
            }],
            children: {}
        };
        expect(integerString.validate('42+')).to.deep.equal(expected);
    });

    it('should reject an hexadecimal number', () => {
        const expected: ValidationTree = {
            errors: [{
                errorType: 'invalid-integer-string',
                actualValue: '0a1b2c3d'
            }],
            children: {}
        };
        expect(integerString.validate('0a1b2c3d')).to.deep.equal(expected);
    });

    it('should reject an ISO 8601 formatted date', () => {
        const expected: ValidationTree = {
            errors: [{
                errorType: 'invalid-integer-string',
                actualValue: '2019-04-04T13:01:40Z'
            }],
            children: {}
        };
        expect(integerString.validate('2019-04-04T13:01:40Z')).to.deep.equal(expected);
    });

    it('should reject a number when a string is expected', () => {
        const expected: ValidationTree = {
            errors: [{
                errorType: 'type-error',
                expectedType: 'string',
                actualType: 'number'
            }],
            children: {}
        };
        expect(integerString.validate(42)).to.deep.equal(expected);
    });

});