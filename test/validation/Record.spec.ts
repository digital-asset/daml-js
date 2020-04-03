// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {expect} from 'chai';
import {TransactionFilter} from "../../src/model/TransactionFilter";
import {ValidationTree} from "../../src/validation/Validation";
import {TransactionFilterValidation} from "../../src/validation/TransactionFilterValidation";

describe('Validation: Record', () => {

    it('should validate an empty object', () => {
        const transactionFilter: TransactionFilter = {
            filtersByParty: {}
        };
        const expected: ValidationTree = {
            errors: [],
            children: {
                filtersByParty: {
                    errors: [],
                    children: {}
                }
            }
        };
        expect(TransactionFilterValidation.validate(transactionFilter)).to.deep.equal(expected);
    });

    it('should validate a simple correct object', () => {
        const transactionFilter: TransactionFilter = {
            filtersByParty: {
                birthday: {
                    inclusive: {
                        templateIds: [
                            {
                                packageId: 'pkg',
                                moduleName: 'mdl',
                                entityName: 'ent',
                            }
                        ]
                    }
                }
            }
        };
        const expected: ValidationTree = {
            errors: [],
            children: {
                filtersByParty: {
                    errors: [],
                    children: {
                        birthday: {
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
                                                        moduleName: {
                                                            errors: [],
                                                            children: {}
                                                        },
                                                        entityName: {
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
                    }
                }
            }
        };
        expect(TransactionFilterValidation.validate(transactionFilter)).to.deep.equal(expected);
    });

    it('should not validate an ill-formed object', () => {
        const invalidTransactionFilter = {
            filtersByParty: {
                birthday: 42
            }
        };
        const expected: ValidationTree = {
            errors: [],
            children: {
                filtersByParty: {
                    errors: [],
                    children: {
                        birthday: {
                            errors: [{
                                errorType: 'type-error',
                                expectedType: 'Filters',
                                actualType: 'number'
                            }],
                            children: {}
                        }
                    }
                }
            }
        };
        expect(TransactionFilterValidation.validate(invalidTransactionFilter)).to.deep.equal(expected);
    });

});