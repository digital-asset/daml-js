// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';
import {Command} from "../../src/model/Command";
import {CreateCommand} from "../../src/model/CreateCommand";
import {ExerciseCommand} from "../../src/model/ExerciseCommand";
import {ArbitraryIdentifier} from "./ArbitraryIdentifier";
import {ArbitraryRecord, ArbitraryValue} from "./ArbitraryRecordValueVariant";

export const ArbitraryCommand: jsc.Arbitrary<Command> = jsc.oneof([
    jsc.record<CreateCommand>({
        __type__: jsc.constant('create'),
        templateId: ArbitraryIdentifier,
        arguments: ArbitraryRecord
    }),
    jsc.record<ExerciseCommand>({
        __type__: jsc.constant('exercise'),
        templateId: ArbitraryIdentifier,
        contractId: jsc.string,
        choice: jsc.string,
        argument: ArbitraryValue
    })
]);
