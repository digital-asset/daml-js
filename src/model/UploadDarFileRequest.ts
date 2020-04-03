// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Examples:
 * 
 * ```
 * {
 *     darFile: <Array of Unsign int 8 bit>,
 * }
 * ```
 */
export interface UploadDarFileRequest {
    
    // Contains a DAML archive DAR file, which in turn is a jar like zipped
    // container for ``daml_lf`` archives. See further details in
    // ``daml_lf.proto``.
    // Required
    darFile: string
}