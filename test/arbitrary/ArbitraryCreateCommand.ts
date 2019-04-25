// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryRecord} from './ArbitraryRecordValueVariant';
import {ArbitraryIdentifier} from './ArbitraryIdentifier';
import {CreateCommand} from "../../src/model/CreateCommand";

export const ArbitraryCreateCommand: jsc.Arbitrary<CreateCommand> =
    jsc.record<CreateCommand>({
        __type__: jsc.constant('create'),
        arguments: ArbitraryRecord,
        templateId: ArbitraryIdentifier
    });
