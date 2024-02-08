// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {HashFunction} from "./HashFunction";

/**
 * Example:
 *
 * ```
 * {
 *     hashFunction: HashFunction.SHA256
 *     hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
 *     archivePayload: 'dGhpcyBpcyBhIHdvbmRlcmZ1bCBkYW1sIG1vZHVsZSwgY29tcGlsZWQgdG8gZGFtbC1sZiBhbmQgaGVyZSBzaG93biB0byB5b3UgaW4gYmFzZTY0IGVuY29kaW5nIDop',
 * }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see HashFunction
 */
export interface GetPackageResponse {

    /**
     * The hash function we use to calculate the hash.
     */
    hashFunction: HashFunction

    /**
     * The hash of the archive payload.
     */
    hash: string

    /**
     * Contains a DAML-LF {@link ArchivePayload} encoded in Base64.
     */
    archivePayload: string
}