#!/usr/bin/env bash
# Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-Identifier: Apache-2.0

set -euxo pipefail

cd "$(dirname "${0}")"
DAML_SRC=test/integration/src

(cd "$DAML_SRC" && "$HOME"/.daml/bin/daml build)
PORT=$(node reserve-port)
echo "$PORT" > sandbox.port
(cd "$DAML_SRC" && "$HOME"/.daml/bin/daml sandbox -p "$PORT" dist/*.dar >sandbox.out 2>sandbox.err &)
