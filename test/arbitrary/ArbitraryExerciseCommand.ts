// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryValue} from "./ArbitraryRecordValueVariant";
import {ArbitraryIdentifier} from "./ArbitraryIdentifier";
import {ExerciseCommand} from "../../src/model/ExerciseCommand";

export const ArbitraryExerciseCommand: jsc.Arbitrary<ExerciseCommand> =
    jsc.record<ExerciseCommand>({
        commandType: jsc.constant("exercise"),
        argument: ArbitraryValue,
        choice: jsc.string,
        contractId: jsc.string,
        templateId: ArbitraryIdentifier
    });
