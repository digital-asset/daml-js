// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {CreateCommand} from './CreateCommand';
import {ExerciseCommand} from "./ExerciseCommand";

export interface Command {
    create?: CreateCommand
    exercise?: ExerciseCommand
}