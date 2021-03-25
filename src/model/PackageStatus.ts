// Copyright (c) 2021 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * An enumeration of possible statuses of a package
 */
export enum PackageStatus {

    /**
     * The server is not aware of such a package.
     */
    UNKNOWN,

    /**
     * The server is able to execute DAML commands operating on this package.
     */
    REGISTERED
}
