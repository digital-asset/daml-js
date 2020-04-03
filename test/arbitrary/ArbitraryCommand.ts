// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {Command} from "../../src/model/Command";
import {ArbitraryCreateCommand} from "./ArbitraryCreateCommand";
import {ArbitraryExerciseCommand} from "./ArbitraryExerciseCommand";
import {ArbitraryCreateAndExerciseCommand} from "./ArbitraryCreateAndExerciseCommand";

export const ArbitraryCommand: jsc.Arbitrary<Command> = jsc.oneof([
    ArbitraryCreateCommand,
    ArbitraryExerciseCommand,
    ArbitraryCreateAndExerciseCommand
]);
