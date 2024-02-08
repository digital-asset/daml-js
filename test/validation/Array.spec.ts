// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {expect} from 'chai';
import {ValidationTree} from "../../src/validation/Validation";
import {array} from "../../src/validation/Array";
import {native} from "../../src/validation/Native";
import {Identifier} from "../../src/model/Identifier";
import {IdentifierValidation} from "../../src/validation/IdentifierValidation";
import {InclusiveFilters} from "../../src/model/InclusiveFilters";
import {InclusiveFiltersValidation} from "../../src/validation/InclusiveFiltersValidation";

describe('Validation: Array', () => {

    it('should validate an empty array correctly', () => {
        const expected: ValidationTree = {
            errors: [],
            children: {}
        };
        expect(array(native('number')).validate([])).to.deep.equal(expected);
    });

    it('should not validate a number', () => {
        const expected: ValidationTree = {
            errors: [{
                errorType: 'type-error',
                expectedType: 'Array<number>',
                actualType: 'number'
            }],
            children: {}
        };
        expect(array(native('number')).validate(42)).to.deep.equal(expected);
    });

    it('should not validate a string', () => {
        const expected: ValidationTree = {
            errors: [{
                errorType: 'type-error',
                expectedType: 'Array<number>',
                actualType: 'string'
            }],
            children: {}
        };
        expect(array(native('number')).validate('42')).to.deep.equal(expected);
    });

    it('should validate an array with one number', () => {
        const expected: ValidationTree = {
            errors: [],
            children: {
                '0': {
                    errors: [],
                    children: {}
                }
            }
        };
        expect(array(native('number')).validate([42])).to.deep.equal(expected);
    });

    it('should validate an array with two numbers', () => {
        const expected: ValidationTree = {
            errors: [],
            children: {
                '0': {
                    errors: [],
                    children: {}
                },
                '1': {
                    errors: [],
                    children: {}
                }
            }
        };
        expect(array(native('number')).validate([42, 47])).to.deep.equal(expected);
    });

    it('should correctly report an error if an underlying item is of the wrong type', () => {
        const expected: ValidationTree = {
            errors: [],
            children: {
                '0': {
                    errors: [],
                    children: {}
                },
                '1': {
                    errors: [{
                        errorType: 'type-error',
                        expectedType: 'number',
                        actualType: 'string'
                    }],
                    children: {}
                }
            }
        };
        expect(array(native('number')).validate([42, '47'])).to.deep.equal(expected);
    });

    it('should validate an array with two objects', () => {
        const identifiers: Identifier[] = [
            {
                packageId: 'bar1',
                moduleName: 'foo1',
                entityName: 'baz1'
            },
            {
                packageId: 'bar2',
                moduleName: 'foo2',
                entityName: 'baz2'
            }
        ];
        const expected: ValidationTree = {
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
                },
                '1': {
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
        };
        expect(array(IdentifierValidation).validate(identifiers)).to.deep.equal(expected);
    });

    it('should correctly report errors in an array with invalid objects', () => {
        const invalidIdentifiers = [
            'not-an-identifier :(',
            {
                moduleName: 'foo',
                entityName: 'baz'
            }
        ];
        const expected: ValidationTree = {
            errors: [],
            children: {
                '0': {
                    errors: [{
                        errorType: 'type-error',
                        expectedType: 'Identifier',
                        actualType: 'string'
                    }],
                    children: {}
                },
                '1': {
                    errors: [{
                        errorType: 'missing-key',
                        expectedKey: 'packageId',
                        expectedType: 'string'
                    }],
                    children: {
                        moduleName: {
                            errors: [],
                            children: {}
                        },
                        entityName: {
                            errors: [],
                            children: {}
                        },
                    }
                }
            }
        };
        expect(array(IdentifierValidation).validate(invalidIdentifiers)).to.deep.equal(expected);
    });

    it('should validate an empty set of filters', () => {
        const inclusiveFilters: InclusiveFilters = {
            templateIds: []
        };
        const expected: ValidationTree = {
            errors: [],
            children: {
                templateIds: {
                    errors: [],
                    children: {}
                }
            }
        };
        expect(InclusiveFiltersValidation.validate(inclusiveFilters)).to.deep.equal(expected);
    });

    it('should validate an set of filters with one identifier', () => {
        const inclusiveFilters: InclusiveFilters = {
            templateIds: [{
                packageId: 'bar',
                moduleName: 'foo',
                entityName: 'baz',
            }]
        };
        const expected: ValidationTree = {
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
        };
        expect(InclusiveFiltersValidation.validate(inclusiveFilters)).to.deep.equal(expected);
    });

    it('should validate an set of filters with two identifiers', () => {
        const inclusiveFilters: InclusiveFilters = {
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
                        },
                        '1': {
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
        };
        expect(InclusiveFiltersValidation.validate(inclusiveFilters)).to.deep.equal(expected);
    });

    it('should not validate a string', () => {
        const invalidInclusiveFilters = 'not a valid object :(';
        const expected: ValidationTree = {
            errors: [{
                errorType: 'type-error',
                expectedType: 'InclusiveFilters',
                actualType: 'string'
            }],
            children: {}
        };
        expect(InclusiveFiltersValidation.validate(invalidInclusiveFilters)).to.deep.equal(expected);
    });

    it('should provide precise feedback about a single mistake', () => {
        const invalidInclusiveFilters = {
            templateIds: [{
                packageId: 'bar1',
                moduleName: 'foo1',
                entityName: 'baz1',
            }, {
                packageId: 42,
                moduleName: 'foo2',
                entityName: 'baz2',
            }]
        };
        const expected: ValidationTree = {
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
                        },
                        '1': {
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
                                    errors: [{
                                        errorType: 'type-error',
                                        expectedType: 'string',
                                        actualType: 'number'
                                    }],
                                    children: {}
                                }
                            }
                        }
                    }
                }
            }
        };
        expect(InclusiveFiltersValidation.validate(invalidInclusiveFilters)).to.deep.equal(expected);
    });

    it('should provide thorough feedback about extensive mistakes', () => {
        const invalidInclusiveFilters = {
            templateIds: [{
                moduleName: false
            },
                42
            ]
        };
        const expected: ValidationTree = {
            errors: [],
            children: {
                templateIds: {
                    errors: [],
                    children: {
                        '0': {
                            errors: [{
                                errorType: 'missing-key',
                                expectedKey: 'packageId',
                                expectedType: 'string'
                            }, {
                                errorType: 'missing-key',
                                expectedKey: 'entityName',
                                expectedType: 'string'
                            }],
                            children: {
                                moduleName: {
                                    errors: [{
                                        errorType: 'type-error',
                                        expectedType: 'string',
                                        actualType: 'boolean'
                                    }],
                                    children: {}
                                }
                            }
                        },
                        '1': {
                            errors: [{
                                errorType: 'type-error',
                                expectedType: 'Identifier',
                                actualType: 'number'
                            }],
                            children: {}
                        }
                    }
                }
            }
        };
        expect(InclusiveFiltersValidation.validate(invalidInclusiveFilters)).to.deep.equal(expected);
    });

});