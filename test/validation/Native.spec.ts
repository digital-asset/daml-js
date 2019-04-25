// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {expect} from 'chai';
import {native} from "../../src/validation/Native";
import {ValidationTree} from "../../src/validation/Validation";

describe('Validation: Native', () => {

    it('should validate a simple string correctly', () => {
        const expected: ValidationTree = {
            errors: [],
            children: {}
        }
        expect(native('string').validate('hello, world')).to.deep.equal(expected);
    });

    it('should fail to isValid a number when a string is expected', () => {
        const expected: ValidationTree = {
            errors: [{
                __type__: 'type-error',
                expectedType: 'string',
                actualType: 'number'
            }],
            children: {}
        }
        expect(native('string').validate(42)).to.deep.equal(expected);
    });

    it('should fail to isValid a string when a boolean is expected', () => {
        const expected: ValidationTree = {
            errors: [{
                __type__: 'type-error',
                expectedType: 'boolean',
                actualType: 'string'
            }],
            children: {}
        }
        expect(native('boolean').validate('true')).to.deep.equal(expected);
    });

});