// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';
import {Command} from "../../src/model/Command";
import {CreateCommand} from "../../src/model/CreateCommand";
import {ExerciseCommand} from "../../src/model/ExerciseCommand";
import {ArbitraryCreateCommand} from "./ArbitraryCreateCommand";
import {ArbitraryExerciseCommand} from "./ArbitraryExerciseCommand";

const Create: jsc.Arbitrary<Command> = ArbitraryCreateCommand.smap<{
    create?: CreateCommand;
}>(create => ({create: create}), command => command.create!);
const Exercise: jsc.Arbitrary<Command> = ArbitraryExerciseCommand.smap<{
    exercise?: ExerciseCommand;
}>(exercise => ({exercise: exercise}), command => command.exercise!);

export const ArbitraryCommand: jsc.Arbitrary<Command> = jsc.oneof([
    Create,
    Exercise
]);
