// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ListKnownPartiesRequest} from "../model/ListKnownPartiesRequest";
import {ClientReadableObjectStream} from "../call/ClientReadableObjectStream";
import {ListKnownPartiesResponse} from "../model/ListKnownPartiesResponse";

export interface PartyManagementClient{
    listKnownParties(requestObject: ListKnownPartiesRequest): ClientReadableObjectStream<ListKnownPartiesResponse>
}