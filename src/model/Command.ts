// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {CreateCommand} from './CreateCommand';
import {ExerciseCommand} from "./ExerciseCommand";
import {CreateAndExerciseCommand} from "./CreateAndExerciseCommand";

export type Command = CreateCommand | ExerciseCommand | CreateAndExerciseCommand