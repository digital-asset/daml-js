#!/usr/bin/env bash
# Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-Identifier: Apache-2.0

set -euxo pipefail

cd "$(dirname "${0}")"
DAML_SRC=test/integration/src

(cd "$DAML_SRC" && "$HOME"/.daml/bin/daml build && "$HOME"/.daml/bin/daml damlc inspect-dar .daml/dist/IntegrationTests-0.0.0.dar | tail -n 1 | awk '{print $2}' | tr -d '"' > ../IntegrationTests-0.0.0.sha256)
(cd "$DAML_SRC/uploadDar" && "$HOME"/.daml/bin/daml build && "$HOME"/.daml/bin/daml damlc inspect-dar .daml/dist/UploadDarIntegrationTests-0.0.0.dar | tail -n 1 | awk '{print $2}' | tr -d '"' > ../../UploadDarIntegrationTests-0.0.0.sha256)

PORT=$(node reserve-port)
echo "$PORT" > sandbox.port
(cd "$DAML_SRC" && "$HOME"/.daml/bin/daml sandbox --static-time --eager-package-loading -p "$PORT" .daml/dist/*.dar >sandbox.out 2>sandbox.err &)
