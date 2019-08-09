// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

export interface PartyDetails {

    // The stable unique identifier of a DAML party.
    // Must be a valid PartyIdString (as described in ``value.proto``).
    // Required
    party: string;
  
    // Human readable name associated with the party. Caution, it might not be
    // unique.
    // Optional
    displayName?: string;
  
    // true if party is hosted by the backing participant.
    // Required
    isLocal: boolean;
  }
  