// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {expect} from 'chai';
import {LedgerOffset} from "../../src/model/LedgerOffset";
import {ValidationTree} from "../../src/validation/Validation";
import {LedgerOffsetValidation} from "../../src/validation/LedgerOffsetValidation";

describe('Validation: Union', () => {

    it('should validate an absolute offset', () => {
        const offset: LedgerOffset = {
            absolute: '20'
        };
        const expected: ValidationTree = {
            errors: [],
            children: {
                absolute: {
                    errors: [],
                    children: {}
                }
            }
        };
        expect(LedgerOffsetValidation.validate(offset)).to.deep.equal(expected);
    });

    it('should validate a valid boundary (begin)', () => {
        const offset: LedgerOffset = {
            boundary: LedgerOffset.Boundary.BEGIN
        };
        const expected: ValidationTree = {
            errors: [],
            children: {
                boundary: {
                    errors: [],
                    children: {}
                }
            }
        };
        expect(LedgerOffsetValidation.validate(offset)).to.deep.equal(expected);
    });

    it('should validate a valid boundary (end)', () => {
        const offset: LedgerOffset = {
            boundary: LedgerOffset.Boundary.END
        };
        const expected: ValidationTree = {
            errors: [],
            children: {
                boundary: {
                    errors: [],
                    children: {}
                }
            }
        };
        expect(LedgerOffsetValidation.validate(offset)).to.deep.equal(expected);
    });

    it('should not validate a ledger offset with both (valid) absolute and boundary values', () => {
        const offset: LedgerOffset = {
            absolute: '20',
            boundary: LedgerOffset.Boundary.END
        };
        const expected: ValidationTree = {
            errors: [{
                kind: 'non-unique-union',
                keys: ['absolute', 'boundary']
            }],
            children: {
                absolute: {
                    errors: [],
                    children: {}
                },
                boundary: {
                    errors: [],
                    children: {}
                }
            }
        };
        expect(LedgerOffsetValidation.validate(offset)).to.deep.equal(expected);
    });

    it('should not validate a ledger offset without values', () => {
        const offset: LedgerOffset = {};
        const expected: ValidationTree = {
            errors: [{
                kind: 'non-unique-union',
                keys: []
            }],
            children: {}
        };
        expect(LedgerOffsetValidation.validate(offset)).to.deep.equal(expected);
    });

    it('should not validate a ledger offset with an unexpected key', () => {
        const offset = {
            wrong: '20'
        };
        const expected: ValidationTree = {
            errors: [{
                kind: 'unexpected-key',
                key: 'wrong'
            }],
            children: {}
        };
        expect(LedgerOffsetValidation.validate(offset)).to.deep.equal(expected);
    });

});