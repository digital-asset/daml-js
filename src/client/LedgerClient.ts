// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ValidationReporter} from "../reporting/ValidationReporter";
import {ActiveContractsClient} from "./ActiveContractsClient";
import {CommandClient} from "./CommandClient";
import {CommandCompletionClient} from "./CommandCompletionClient";
import {CommandSubmissionClient} from "./CommandSubmissionClient";
import {LedgerIdentityClient} from "./LedgerIdentityClient";
import {PackageClient} from "./PackageClient";
import {LedgerConfigurationClient} from "./LedgerConfigurationClient";
import {TimeClient} from "./TimeClient";
import {TransactionClient} from "./TransactionClient";
import {ResetClient} from "./ResetClient";
import {PartyManagementClient} from "./PartyManagementClient";
import {PackageManagementClient} from "./PackageManagementClient";

/**
 * The ledger required to connect to a {@link LedgerClient}
 */
export interface LedgerClientOptions {
    host: string
    port: number
    reporter?: ValidationReporter
    rootCerts?: Buffer
    privateKey?: Buffer
    certChain?: Buffer,
    grpcOptions?: object,
}

/**
 * Contains the set of services provided by a ledger implementation
 */
export interface LedgerClient {
    /**
     * The identifier of the ledger to which this {@link LedgerClient} is connected
     */
    ledgerId: string
    activeContractsClient: ActiveContractsClient
    commandClient: CommandClient
    commandCompletionClient: CommandCompletionClient
    commandSubmissionClient: CommandSubmissionClient
    ledgerIdentityClient: LedgerIdentityClient
    packageClient: PackageClient
    ledgerConfigurationClient: LedgerConfigurationClient
    timeClient: TimeClient
    transactionClient: TransactionClient
    resetClient: ResetClient
    partyManagementClient: PartyManagementClient
    packageManagementClient: PackageManagementClient
}
