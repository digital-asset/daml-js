// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import * as jsc from 'jsverify';
import {Empty} from "../../src/model/Empty";

// Can't use jsc.constant: we are going to mutate the object for test purposes and `constant` returns always the same instance
export const ArbitraryEmpty: jsc.Arbitrary<Empty> = jsc.bless({
    generator: jsc.generator.bless(() => ({}))
});
