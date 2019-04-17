// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0


import {Empty} from "../model/Empty";
import {object} from "./Object";
import {noFields} from "./Validation";

export const EmptyValidation = object<Empty>('Empty', noFields, noFields)
