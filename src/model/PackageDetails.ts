// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Timestamp} from "./Timestamp";

/**
 * A representation of information abput dar package.
 */
export interface PackageDetails {
    
    /**
     * An identifier for the package
     */
    packageId: string

    /**
     * The size of the package
     */
    packageSize: number

    /**
     * Time when the package is uploaded
     */
    knownSince?: Timestamp

    /**
     * A texttual description associated with the package
     */
    sourceDescription: string
}