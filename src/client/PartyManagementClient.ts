// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Callback} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {ListKnownPartiesResponse} from "../model/ListKnownPartiesResponse";

export interface PartyManagementClient{
    listKnownParties(): Promise<ListKnownPartiesResponse>
    listKnownParties(callback: Callback<ListKnownPartiesResponse>): ClientCancellableCall
}