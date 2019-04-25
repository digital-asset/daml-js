// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryValue} from "./ArbitraryRecordValueVariant";
import {ArbitraryIdentifier} from "./ArbitraryIdentifier";
import {ExerciseCommand} from "../../src/model/ExerciseCommand";

export const ArbitraryExerciseCommand: jsc.Arbitrary<ExerciseCommand> = jsc
    .tuple([ArbitraryValue, jsc.string, jsc.string, ArbitraryIdentifier])
    .smap<ExerciseCommand>(
        ([args, choice, contractId, templateId]) => ({
            argument: args,
            choice: choice,
            contractId: contractId,
            templateId: templateId
        }),
        exerciseCommand => [
            exerciseCommand.argument,
            exerciseCommand.choice,
            exerciseCommand.contractId,
            exerciseCommand.templateId
        ]
    );
