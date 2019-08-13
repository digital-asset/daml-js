// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {expect} from 'chai';
import {LedgerOffset, LedgerOffsetBoundaryValue} from "../../src/model/LedgerOffset";
import {ValidationTree} from "../../src/validation/Validation";
import {LedgerOffsetValidation} from "../../src/validation/LedgerOffsetValidation";

describe('Validation: Union', () => {

    it('should validate an absolute offset', () => {
        const offset: LedgerOffset = {
            offsetType: 'absolute',
            absolute: '20'
        };
        const expected: ValidationTree = {
            errors: [],
            children: {
                absolute: {
                    errors: [],
                    children: {}
                },
                offsetType: {
                    errors: [],
                    children: {}
                }
            }
        };
        expect(LedgerOffsetValidation.validate(offset)).to.deep.equal(expected);
    });

    it('should validate a valid boundary (begin)', () => {
        const offset: LedgerOffset = {
            offsetType: 'boundary',
            boundary: LedgerOffsetBoundaryValue.BEGIN
        };
        const expected: ValidationTree = {
            errors: [],
            children: {
                boundary: {
                    errors: [],
                    children: {}
                },
                offsetType: {
                    errors: [],
                    children: {}
                }
            }
        };
        expect(LedgerOffsetValidation.validate(offset)).to.deep.equal(expected);
    });

    it('should validate a valid boundary (end)', () => {
        const offset: LedgerOffset = {
            offsetType: 'boundary',
            boundary: LedgerOffsetBoundaryValue.END
        };
        const expected: ValidationTree = {
            errors: [],
            children: {
                boundary: {
                    errors: [],
                    children: {}
                },
                offsetType: {
                    errors: [],
                    children: {}
                }
            }
        };
        expect(LedgerOffsetValidation.validate(offset)).to.deep.equal(expected);
    });

    it('should not validate a ledger offset without a type tag', () => {
        const offset = {
            absolute: '20',
            boundary: LedgerOffsetBoundaryValue.END
        };
        const expected: ValidationTree = {
            errors: [{
                errorType: 'missing-type-tag',
                expectedTypeTags: ['absolute', 'boundary']
            }],
            children: {}
        };
        expect(LedgerOffsetValidation.validate(offset)).to.deep.equal(expected);
    });

    it('should not validate a ledger offset with an unexpected key', () => {
        const offset = {
            offsetType: 'absolute',
            wrong: '20'
        };
        const expected: ValidationTree = {
            errors: [{
                errorType: 'missing-key',
                expectedType: 'string',
                expectedKey: 'absolute'
            }, {
                errorType: 'unexpected-key',
                key: 'wrong'
            }],
            children: {
                offsetType: {
                    children: {},
                    errors: []
                }
            }
        };
        expect(LedgerOffsetValidation.validate(offset)).to.deep.equal(expected);
    });

});