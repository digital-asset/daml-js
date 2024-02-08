// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {IdentifierValidation} from "./IdentifierValidation";
import {Variant} from "../model/Variant";
import {OptionalFieldsValidators, RequiredFieldsValidators} from "./Validation";
import {native} from "./Native";
import {ValueValidation} from "./ValueValidation";
import {object} from "./Object";

function required(): RequiredFieldsValidators<Variant> {
    return {
        constructor: native('string'),
        value: ValueValidation,
    };
}

function optional(): OptionalFieldsValidators<Variant> {
    return {
        variantId: IdentifierValidation,
    };
}

export const VariantValidation = object<Variant>('Variant', required, optional);
