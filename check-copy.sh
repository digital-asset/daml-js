#!/usr/bin/env bash
# Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-Identifier: Apache-2.0

set -euo pipefail

TS_HEAD="// Copyright (c) $(date +%Y) Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.\n// SPDX-License-Identifier: Apache-2.0"
JS_HEAD="// Copyright (c) $(date +%Y) Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.\n// SPDX-License-Identifier: Apache-2.0"
SH_HEAD="#!/usr/bin/env bash\n# Copyright (c) $(date +%Y) Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.\n# SPDX-License-Identifier: Apache-2.0"

RESULT=0

echo "Checking license headers..."

for SRC in $(git ls-files | grep '\.ts$'); do
    if [ "$(head -n 2 "$SRC")" != "$(echo -e $TS_HEAD)" ]; then
        echo -n FAIL
        RESULT=1
    else
	echo -n OK
    fi
    echo -e "\t$SRC"
done

for SRC in $(git ls-files | grep '\.js$'); do
    if [ "$(head -n 2 "$SRC")" != "$(echo -e $JS_HEAD)" ]; then
        echo -n FAIL
        RESULT=1
    else
	echo -n OK
    fi
    echo -e "\t$SRC"
done

for SRC in $(git ls-files | grep '\.sh$'); do
    if [ "$(head -n 3 "$SRC")" != "$(echo -e $SH_HEAD)" ]; then
        echo -n FAIL
        RESULT=1
    else
	echo -n OK
    fi
    echo -e "\t$SRC"
done

exit "$RESULT"
