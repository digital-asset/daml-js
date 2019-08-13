// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';

export const ArbitraryIntegerString: jsc.Arbitrary<string> = jsc.integer.smap(n => '' + n, n => parseInt(n, 10));
