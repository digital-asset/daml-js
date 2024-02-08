// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

export namespace ErrorMessages {

    export function unknownDeserialization(typename: string): string {
        return `${typename} deserialization error, unable to discriminate value type. ` +
            "The possible causes are: " +
            "1) You are using a version of the bindings that is not up to date and does not account for features in DAML that have been introduced after their release, or " +
            "2) This is a bug in the bindings themselves, in which case you are warmly encouraged to open an issue stating the DAML SDK version, bindings version and the (possibly redacted) stacktrace of the error: https://github.com/digital-asset/daml-js/issues/new";
    }

}
