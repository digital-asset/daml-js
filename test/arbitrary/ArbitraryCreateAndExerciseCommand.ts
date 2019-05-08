// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryRecord, ArbitraryValue} from './ArbitraryRecordValueVariant';
import {ArbitraryIdentifier} from './ArbitraryIdentifier';
import {CreateAndExerciseCommand} from "../../src/model/CreateAndExerciseCommand";

export const ArbitraryCreateAndExerciseCommand: jsc.Arbitrary<CreateAndExerciseCommand> =
    jsc.record<CreateAndExerciseCommand>({
        commandType: jsc.constant('createAndExercise'),
        createArguments: ArbitraryRecord,
        templateId: ArbitraryIdentifier,
        choice: jsc.string,
        choiceArgument: ArbitraryValue
    });
