// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';

export function maybe<A>(
    arbitrary: jsc.Arbitrary<A>
): jsc.Arbitrary<A | undefined> {
    return jsc.oneof([arbitrary, jsc.constant<undefined>(undefined)]);
}
