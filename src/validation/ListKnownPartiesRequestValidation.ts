// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ListKnownPartiesRequest} from "../model/ListKnownPartiesRequest";
import {noFields} from "./Validation";
import {object} from "./Object";

export const ListKnownPartiesRequestValidation = object<ListKnownPartiesRequest>('ListKnownPartiesRequest', noFields, noFields);
