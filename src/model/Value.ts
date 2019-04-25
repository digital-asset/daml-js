// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {Empty} from "./Empty";
import {Optional} from "./Optional";
import {Variant} from "./Variant";
import {Record} from "./Record";

export interface Value {
    record?: Record
    variant?: Variant
    contractId?: string
    list?: Value[]
    /**
     * Represented as a {string} to avoid losing precision
     */
    int64?: string
    /**
     * Represented as a {string} to avoid losing precision
     */
    decimal?: string
    text?: string
    /**
     * Represented as a {string} to avoid losing precision
     */
    timestamp?: string
    party?: string
    bool?: boolean
    unit?: Empty
    /**
     * Represented as a {string} for consistency with
     * other numeric types in this union. This also
     * allows the type to remain stable in the face
     * of prospective expansions of the underlying
     * type to a 64-bit encoding.
     */
    date?: string
    optional?: Optional
}