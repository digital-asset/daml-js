// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {Callback} from "../util/Callback";
import {ClientReadableObjectStream} from "../call/ClientReadableObjectStream";
import {ListKnownPartiesResponse} from "../model/ListKnowPartiesResponse";

export interface PartyManagementClient{
    getParties(): ClientReadableObjectStream<ListKnownPartiesResponse>
}