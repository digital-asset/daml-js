// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Serialization/deserialization between a Protocol Buffers message M and an object specified by an interface O
 */
export interface Codec<M, O> {

    /**
     * Serializes a plain JS object into a Protocol Buffers message
     * @param object A JS object
     */
    serialize(object: O): M

    /**
     * Deserializes a Protocol Buffers message to a JS object
     * @param message A Protocol Buffers message
     */
    deserialize(message: M): O

}
