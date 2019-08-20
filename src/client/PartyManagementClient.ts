// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Callback} from "../util/Callback";
import {ClientCancellableCall} from "../call/ClientCancellableCall";
import {ListKnownPartiesResponse} from "../model/ListKnownPartiesResponse";
import {AllocatePartyRequest} from "../model/AllocatePartyRequest";
import {AllocatePartyResponse} from "../model/AllocatePartyResponse";

/**
 * Inspect the party management state of a ledger participant and modify the parts that are modifiable.
 *
 * We use ‘backing participant’ to refer to this specific participant in the methods of this API.
 *
 * When the participant is run in mode requiring authentication, all the calls in this interface will
 * respond with UNAUTHENTICATED, if the caller fails to provide a valid access token, and will respond
 * with PERMISSION_DENIED, if the claims in the token are insufficient to perform a given operation.
 *
 * Subsequently, only specific errors of individual calls not related to authorization will be described.
 */
export interface PartyManagementClient{

    /**
     * Adds a new party to the set managed by the backing participant.
     *
     * Caller specifies a party identifier suggestion, the actual identifier allocated might be different and is implementation specific.
     *
     * This call may:
     * - Succeed, in which case the actual allocated identifier is visible in the response.
     * - Respond with UNIMPLEMENTED if synchronous party allocation is not supported by the backing participant.
     * - Respond with INVALID_ARGUMENT if the provided hint and/or display name is invalid on the given ledger (see below).
     *
     * daml-on-sql: suggestion's uniqueness is checked and call rejected if the identifier is already present
     * daml-on-kv-ledger: suggestion’s uniqueness is checked by the validators in the consensus layer and call rejected if the identifier is already present.
     * canton: completely different globally unique identifier is allocated. Behind the scenes calls to an internal protocol are made. As that protocol is richer than the the surface protocol, the arguments take implicit values
     */
    allocateParty(request: AllocatePartyRequest): Promise<AllocatePartyResponse>
    allocateParty(request: AllocatePartyRequest, callback: Callback<AllocatePartyResponse>): ClientCancellableCall

    /**
     * List the parties known by the backing participant.
     *
     * The list returned contains parties whose ledger access is facilitated by backing participant and the ones maintained elsewhere.
     *
     * This request will always succeed.
     */
    listKnownParties(): Promise<ListKnownPartiesResponse>
    listKnownParties(callback: Callback<ListKnownPartiesResponse>): ClientCancellableCall
}