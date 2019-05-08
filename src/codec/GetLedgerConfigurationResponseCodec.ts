// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {Codec} from "./Codec";
import {GetLedgerConfigurationResponse} from "../model/GetLedgerConfigurationResponse";
import {LedgerConfigurationCodec} from "./LedgerConfigurationCodec";
import {GetLedgerConfigurationResponse as PbGetLedgerConfigurationResponse} from "../generated/com/digitalasset/ledger/api/v1/ledger_configuration_service_pb";

export const GetLedgerConfigurationResponseCodec: Codec<PbGetLedgerConfigurationResponse, GetLedgerConfigurationResponse> = {
    deserialize(message: PbGetLedgerConfigurationResponse): GetLedgerConfigurationResponse {
        return {
            config: LedgerConfigurationCodec.deserialize(message.getLedgerConfiguration()!)
        };
    },
    serialize(object: GetLedgerConfigurationResponse): PbGetLedgerConfigurationResponse {
        const message = new PbGetLedgerConfigurationResponse();
        message.setLedgerConfiguration(LedgerConfigurationCodec.serialize(object.config));
        return message;
    }
};