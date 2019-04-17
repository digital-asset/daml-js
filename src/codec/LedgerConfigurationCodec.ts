// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {Codec} from "./Codec";
import {LedgerConfiguration} from "../model/LedgerConfiguration";
import {DurationCodec} from "./DurationCodec";
import {LedgerConfiguration as PbLedgerConfiguration} from "../generated/com/digitalasset/ledger/api/v1/ledger_configuration_service_pb";

export const LedgerConfigurationCodec: Codec<PbLedgerConfiguration, LedgerConfiguration> = {
    deserialize(message: PbLedgerConfiguration): LedgerConfiguration {
        return {
            minTtl: DurationCodec.deserialize(message.getMinTtl()!),
            maxTtl: DurationCodec.deserialize(message.getMaxTtl()!)
        };
    },
    serialize(object: LedgerConfiguration): PbLedgerConfiguration {
        const message = new PbLedgerConfiguration();
        message.setMinTtl(DurationCodec.serialize(object.minTtl));
        message.setMaxTtl(DurationCodec.serialize(object.maxTtl));
        return message;
    }
};