// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {expect} from 'chai';
import {enumeration} from "../../src/validation/Enumeration";
import {LedgerOffsetBoundaryValue} from "../../src/model/LedgerOffset";
import {ValidationTree} from "../../src/validation/Validation";

describe('Validation: Enumeration', () => {

    it('should validate a value of the enumeration correctly', () => {
        const expected: ValidationTree = {
            errors: [],
            children: {}
        };
        const validation = enumeration(LedgerOffsetBoundaryValue, 'LedgerOffsetBoundaryValue')
        expect(validation.validate(LedgerOffsetBoundaryValue.BEGIN)).to.deep.equal(expected);
    });

    it('should validate a second value of the enumeration correctly', () => {
        const expected: ValidationTree = {
            errors: [],
            children: {}
        };
        const validation = enumeration(LedgerOffsetBoundaryValue, 'LedgerOffsetBoundaryValue')
        expect(validation.validate(LedgerOffsetBoundaryValue.END)).to.deep.equal(expected);
    });

    it('should not validate a value which is not part of the enumeration', () => {
        const expected: ValidationTree = {
            errors: [{
                errorType: 'type-error',
                expectedType: 'LedgerOffsetBoundaryValue',
                actualType: 'number'
            }],
            children: {}
        };
        const validation = enumeration(LedgerOffsetBoundaryValue, 'LedgerOffsetBoundaryValue')
        expect(validation.validate(42)).to.deep.equal(expected);
    });

});