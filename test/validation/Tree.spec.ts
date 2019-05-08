// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {expect} from 'chai';
import {isValid, ValidationTree} from "../../src/validation/Validation";

describe('ValidationValidationTree: isValid', () => {

    it('should tell the empty tree is valid', () => {
        const tree: ValidationTree = {
            errors: [],
            children: {}
        };
        expect(isValid(tree)).to.be.true;
    });

    it('should tell a well-formed tree is such', () => {
        const tree: ValidationTree = {
            errors: [],
            children: {
                inclusive: {
                    errors: [],
                    children: {
                        templateIds: {
                            errors: [],
                            children: {
                                '0': {
                                    errors: [],
                                    children: {
                                        name: {
                                            errors: [],
                                            children: {}
                                        },
                                        packageId: {
                                            errors: [],
                                            children: {}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        expect(isValid(tree)).to.be.true;
    });

    it('should tell an ill-formed tree is such', () => {
        const tree: ValidationTree = {
            errors: [],
            children: {
                filtersByParty: {
                    errors: [],
                    children: {
                        birthday: {
                            errors: [{
                                errorType: 'type-error',
                                expectedType: 'Filters',
                                actualType: 'string'
                            }],
                            children: {}
                        }
                    }
                }
            }
        }
        expect(isValid(tree)).to.be.false;
    });

});