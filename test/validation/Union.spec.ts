// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {expect} from 'chai';
import {LedgerOffset, LedgerOffsetBoundaryValue} from "../../src/model/LedgerOffset";
import {ValidationTree} from "../../src/validation/Validation";
import {LedgerOffsetValidation} from "../../src/validation/LedgerOffsetValidation";

describe('Validation: Union', () => {

    it('should validate an absolute offset', () => {
        const offset: LedgerOffset = {
            __type__: 'absolute',
            absolute: '20'
        };
        const expected: ValidationTree = {
            errors: [],
            children: {
                absolute: {
                    errors: [],
                    children: {}
                },
                __type__: {
                    errors: [],
                    children: {}
                }
            }
        };
        expect(LedgerOffsetValidation.validate(offset)).to.deep.equal(expected);
    });

    it('should validate a valid boundary (begin)', () => {
        const offset: LedgerOffset = {
            __type__: 'boundary',
            boundary: LedgerOffsetBoundaryValue.BEGIN
        };
        const expected: ValidationTree = {
            errors: [],
            children: {
                boundary: {
                    errors: [],
                    children: {}
                },
                __type__: {
                    errors: [],
                    children: {}
                }
            }
        };
        expect(LedgerOffsetValidation.validate(offset)).to.deep.equal(expected);
    });

    it('should validate a valid boundary (end)', () => {
        const offset: LedgerOffset = {
            __type__: 'boundary',
            boundary: LedgerOffsetBoundaryValue.END
        };
        const expected: ValidationTree = {
            errors: [],
            children: {
                boundary: {
                    errors: [],
                    children: {}
                },
                __type__: {
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
                __type__: 'missing-type-tag',
                expectedTypeTags: ['absolute', 'boundary']
            }],
            children: {}
        };
        expect(LedgerOffsetValidation.validate(offset)).to.deep.equal(expected);
    });

    it('should not validate a ledger offset with an unexpected key', () => {
        const offset = {
            __type__: 'absolute',
            wrong: '20'
        };
        const expected: ValidationTree = {
            errors: [{
                __type__: 'missing-key',
                expectedType: 'string',
                expectedKey: 'absolute'
            }, {
                __type__: 'unexpected-key',
                key: 'wrong'
            }],
            children: {
                __type__: {
                    children: {},
                    errors: []
                }
            }
        };
        expect(LedgerOffsetValidation.validate(offset)).to.deep.equal(expected);
    });

});