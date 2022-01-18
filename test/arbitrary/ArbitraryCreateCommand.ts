// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryRecord} from './ArbitraryRecordValueVariant';
import {ArbitraryIdentifier} from './ArbitraryIdentifier';
import {CreateCommand} from "../../src/model/CreateCommand";

export const ArbitraryCreateCommand: jsc.Arbitrary<CreateCommand> =
    jsc.record<CreateCommand>({
        commandType: jsc.constant('create'),
        arguments: ArbitraryRecord,
        templateId: ArbitraryIdentifier
    });
