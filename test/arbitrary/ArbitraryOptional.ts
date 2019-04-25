// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';
import {ArbitraryValue} from "./ArbitraryRecordValueVariant";
import {Optional} from "../../src/model/Optional";
import {maybe} from "./Maybe";

export const ArbitraryOptional: jsc.Arbitrary<Optional> = maybe(ArbitraryValue).smap<Optional>(
    value => ({
        value: value
    }),
    request => request.value
);
