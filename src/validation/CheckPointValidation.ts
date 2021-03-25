// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {object} from "./Object";
import {noFields, RequiredFieldsValidators} from "./Validation";
import {Checkpoint} from "../model/Checkpoint";
import {LedgerOffsetValidation} from "./LedgerOffsetValidation";
import {TimestampValidation} from "./TimestampValidation";

function required(): RequiredFieldsValidators<Checkpoint> {
    return {
        offset: LedgerOffsetValidation,
        recordTime: TimestampValidation
    };
}

export const CheckpointValidation = object<Checkpoint>('Checkpoint', required, noFields);
