// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Codec} from "./Codec";
import {LedgerConfiguration} from "../model/LedgerConfiguration";
import {DurationCodec} from "./DurationCodec";
import {LedgerConfiguration as PbLedgerConfiguration} from "../generated/com/daml/ledger/api/v1/ledger_configuration_service_pb";

export const LedgerConfigurationCodec: Codec<PbLedgerConfiguration, LedgerConfiguration> = {
    deserialize(message: PbLedgerConfiguration): LedgerConfiguration {
        return {
            maxDeduplicationTime: DurationCodec.deserialize(message.getMaxDeduplicationTime()!)
        };
    },
    serialize(object: LedgerConfiguration): PbLedgerConfiguration {
        const message = new PbLedgerConfiguration();
        message.setMaxDeduplicationTime(DurationCodec.serialize(object.maxDeduplicationTime));
        return message;
    }
};

