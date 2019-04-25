// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {expect} from 'chai';
import {Identifier} from "../../src/model/Identifier";
import {Filters} from "../../src/model/Filters";
import {InclusiveFilters} from "../../src/model/InclusiveFilters";
import {ValidationTree} from "../../src/validation/Validation";
import {IdentifierValidation} from "../../src/validation/IdentifierValidation";
import {FiltersValidation} from "../../src/validation/FiltersValidation";

describe('Validation: Object', () => {

    it('should report a correct tree as such', () => {
        const identifier: Identifier = {
            packageId: 'bar',
            moduleName: 'foo',
            entityName: 'baz',
        };
        const expected: ValidationTree = {
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
        };
        expect(IdentifierValidation.validate(identifier)).to.deep.equal(expected);
    });

    it('should correctly report a missing key', () => {
        const invalidIdentifier = {
            packageId: 'bar'
        };
        const expected: ValidationTree = {
            errors: [{
                kind: 'missing-key',
                expectedKey: 'moduleName',
                expectedType: 'string'
            }, {
                kind: 'missing-key',
                expectedKey: 'entityName',
                expectedType: 'string'
            }],
            children: {
                packageId: {
                    errors: [],
                    children: {}
                }
            }
        };
        expect(IdentifierValidation.validate(invalidIdentifier)).to.deep.equal(expected);
    });

    it('should correctly report a type error in a child', () => {
        const invalidIdentifier = {
            packageId: 'bar',
            moduleName: 42,
            entityName: 'baz',
        };
        const expected: ValidationTree = {
            errors: [],
            children: {
                moduleName: {
                    errors: [
                        {
                            kind: 'type-error',
                            expectedType: 'string',
                            actualType: 'number'
                        }
                    ],
                    children: {}
                },
                packageId: {
                    errors: [],
                    children: {}
                },
                entityName: {
                    errors: [],
                    children: {}
                },
            }
        };
        expect(IdentifierValidation.validate(invalidIdentifier)).to.deep.equal(expected);
    });

    it('should correctly report multiple type errors in the children', () => {
        const invalidIdentifier = {
            packageId: true,
            moduleName: 42,
            entityName: false,
        };
        const expected: ValidationTree = {
            errors: [],
            children: {
                moduleName: {
                    errors: [
                        {
                            kind: 'type-error',
                            expectedType: 'string',
                            actualType: 'number'
                        }
                    ],
                    children: {}
                },
                packageId: {
                    errors: [
                        {
                            kind: 'type-error',
                            expectedType: 'string',
                            actualType: 'boolean'
                        }
                    ],
                    children: {}
                },
                entityName: {
                    errors: [
                        {
                            kind: 'type-error',
                            expectedType: 'string',
                            actualType: 'boolean'
                        }
                    ],
                    children: {}
                },
            }
        };
        expect(IdentifierValidation.validate(invalidIdentifier)).to.deep.equal(expected);
    });

    it('should correctly report a type error at the root (passing a native)', () => {
        const invalidIdentifier = 42;
        const expected: ValidationTree = {
            errors: [
                {
                    kind: 'type-error',
                    expectedType: 'Identifier',
                    actualType: 'number'
                }
            ],
            children: {}
        }
        expect(IdentifierValidation.validate(invalidIdentifier)).to.deep.equal(expected);
    });

    it('should correctly report a type error at the root (passing an array)', () => {
        const invalidIdentifier = [42, 47];
        const expected: ValidationTree = {
            errors: [
                {
                    kind: 'type-error',
                    expectedType: 'Identifier',
                    actualType: 'array'
                }
            ],
            children: {}
        }
        expect(IdentifierValidation.validate(invalidIdentifier)).to.deep.equal(expected);
    });

    it('should validate the filters without the optional fields', () => {
        const emptyFilters: Filters = {}
        const expected: ValidationTree = {
            errors: [],
            children: {}
        };
        expect(FiltersValidation.validate(emptyFilters)).to.deep.equal(expected);
    });

    it('should validate a filter with an empty set of inclusive filters', () => {
        const filters: Filters = {
            inclusive: {
                templateIds: []
            }
        }
        const expected: ValidationTree = {
            errors: [],
            children: {
                inclusive: {
                    errors: [],
                    children: {
                        templateIds: {
                            errors: [],
                            children: {}
                        }
                    }
                }
            }
        };
        expect(FiltersValidation.validate(filters)).to.deep.equal(expected);
    });

    it('should validate a filter with a set of inclusive filters with one identifier', () => {
        const filters: Filters = {
            inclusive: {
                templateIds: [{
                    packageId: 'bar',
                    moduleName: 'foo',
                    entityName: 'baz',
                }]
            }
        };
        const expected: ValidationTree = {
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
        };
        expect(FiltersValidation.validate(filters)).to.deep.equal(expected);
    });

    it('should not validate a string', () => {
        const invalidFilters = 'not a valid object :(';
        const expected: ValidationTree = {
            errors: [{
                kind: 'type-error',
                expectedType: 'Filters',
                actualType: 'string'
            }],
            children: {}
        };
        expect(FiltersValidation.validate(invalidFilters)).to.deep.equal(expected);
    });

    it('should report in case of a crass mistake', () => {
        const actuallyInclusiveFilters: InclusiveFilters = {
            templateIds: [{
                packageId: 'bar1',
                moduleName: 'foo1',
                entityName: 'baz1',
            }, {
                packageId: 'bar2',
                moduleName: 'foo2',
                entityName: 'baz2',
            }]
        };
        const expected: ValidationTree = {
            errors: [{
                kind: 'unexpected-key',
                key: 'templateIds'
            }],
            children: {}
        };
        expect(FiltersValidation.validate(actuallyInclusiveFilters)).to.deep.equal(expected);
    });

});