// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {expect} from 'chai';
import {enumeration} from "../../src/validation/Enumeration";
import {LedgerOffset} from "../../src/model/LedgerOffset";
import {ValidationTree} from "../../src/validation/Validation";

describe('Validation: Enumeration', () => {

    it('should validate a value of the enumeration correctly', () => {
        const expected: ValidationTree = {
            errors: [],
            children: {}
        }
        const validation = enumeration(LedgerOffset.Boundary, 'LedgerOffsetValidation.Boundary')
        expect(validation.validate(LedgerOffset.Boundary.BEGIN)).to.deep.equal(expected);
    });

    it('should validate a second value of the enumeration correctly', () => {
        const expected: ValidationTree = {
            errors: [],
            children: {}
        }
        const validation = enumeration(LedgerOffset.Boundary, 'LedgerOffsetValidation.Boundary')
        expect(validation.validate(LedgerOffset.Boundary.END)).to.deep.equal(expected);
    });

    it('should not validate a value which is not part of the enumeration', () => {
        const expected: ValidationTree = {
            errors: [{
                kind: 'type-error',
                expectedType: 'LedgerOffsetValidation.Boundary',
                actualType: 'number'
            }],
            children: {}
        }
        const validation = enumeration(LedgerOffset.Boundary, 'LedgerOffsetValidation.Boundary')
        expect(validation.validate(42)).to.deep.equal(expected);
    });

});