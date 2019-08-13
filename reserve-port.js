// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

const dummy = require('net').createServer(_socket => {});

dummy.listen(0, () => {
    console.log(dummy.address().port);
    dummy.close(_error => {})
});
