// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {CreateCommand} from './CreateCommand';
import {ExerciseCommand} from "./ExerciseCommand";
import {CreateAndExerciseCommand} from "./CreateAndExerciseCommand";

/**
 * A command can either create a new contract or exercise a choice on an existing contract.
 *
 * Uses the `commandType` string type tag to differentiate between types in the union.
 */
export type Command = CreateCommand | ExerciseCommand | CreateAndExerciseCommand