// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';

import {containsError} from '.';
import {isValid, UnionValidation} from "../../src/validation/Validation";
import {CommandValidation} from "../../src/validation/CommandValidation";
import {ValueValidation} from "../../src/validation/ValueValidation";
import {LedgerOffsetValidation} from "../../src/validation/LedgerOffsetValidation";
import {TreeEventValidation} from "../../src/validation/TreeEventValidation";
import {EventValidation} from "../../src/validation/EventValidation";
import {ArbitraryEvent, ArbitraryTreeEvent} from "../arbitrary/ArbitraryEvent";
import {ArbitraryLedgerOffset} from "../arbitrary/ArbitraryLedgerOffset";
import {ArbitraryValue} from "../arbitrary/ArbitraryRecordValueVariant";
import {ArbitraryCommand} from "../arbitrary/ArbitraryCommand";

function test<A extends { kind: string } & { [_: string]: any }>(
    validation: UnionValidation<A>,
    arbitrary: jsc.Arbitrary<A>
): void {
    describe(`Validation: ${validation.type}`, () => {
        if (validation.type !== 'null') {
            jsc.property('not validate a null', () => {
                return !isValid(validation.validate(null));
            });
            jsc.property('signal a type error on a null', () => {
                return containsError(validation.validate(null).errors, {
                    kind: 'type-error',
                    expectedType: validation.type,
                    actualType: 'null'
                });
            });
        }
        jsc.property('validate well-formed objects', arbitrary, value => {
            return isValid(validation.validate(value));
        });
        jsc.property('not validate objects with an extra key', arbitrary, value => {
            const extraKey = 'supercalifragilisticexpialidocious'; // reasonably no one will ever use this as a key
            value[extraKey] = null;
            return !isValid(validation.validate(value));
        });
        jsc.property(
            'signal an unexpected key error on objects with an extra key',
            arbitrary,
            value => {
                const extraKey = 'supercalifragilisticexpialidocious'; // reasonably no one will ever use this as a key
                value[extraKey] = null;
                return containsError(validation.validate(value).errors, {
                    kind: 'unexpected-key',
                    key: extraKey
                });
            }
        );
        jsc.property(
            'not validate objects without at least one defined key',
            () => {
                return !isValid(validation.validate({}));
            }
        );
        jsc.property(
            'signal a missing type tag error on unions without a type tag',
            () => {
                return containsError(validation.validate({}).errors, {
                    kind: 'missing-type-tag',
                    expectedTypeTags: Object.keys(validation.values())
                });
            }
        );
        jsc.property(
            'signal an unexpected type tag error for invalid type tags',
            arbitrary,
            value => {
                value['kind'] = 'supercalifragilisticexpialidocious'; // reasonably this will never be a valid type tag
                return containsError(validation.validate(value).errors, {
                    kind: 'unexpected-type-tag',
                    expectedTypeTags: Object.keys(validation.values()),
                    actualTypeTag: 'supercalifragilisticexpialidocious'
                });
            }
        );
    });
}

test(CommandValidation, ArbitraryCommand);
test(EventValidation, ArbitraryEvent);
test(TreeEventValidation, ArbitraryTreeEvent);
test(LedgerOffsetValidation, ArbitraryLedgerOffset);
test(ValueValidation, ArbitraryValue);
