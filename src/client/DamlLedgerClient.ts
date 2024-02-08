// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { ChannelCredentials, credentials, makeClientConstructor } from '@grpc/grpc-js';

import { Callback, forward } from '../util/Callback';
import { LedgerClient, LedgerClientOptions } from "./LedgerClient";
import { HumanReadableReporter } from "../reporting/HumanReadableReporter";
import { ActiveContractsClient } from "./ActiveContractsClient";
import { CommandClient } from "./CommandClient";
import { ValidationReporter } from "../reporting/ValidationReporter";
import { CommandCompletionClient } from "./CommandCompletionClient";
import { NodeJsResetClient } from "./NodeJsResetClient";
import { TransactionClient } from "./TransactionClient";
import { TimeClient } from "./TimeClient";
import { LedgerConfigurationClient } from "./LedgerConfigurationClient";
import { NodeJsPackageClient } from "./NodeJsPackageClient";
import { NodeJsLedgerIdentityClient } from "./NodeJsLedgerIdentityClient";
import { NodeJsCommandSubmissionClient } from "./NodeJsCommandSubmissionClient";
import { NodeJsPartyManagementClient } from "./NodeJsPartyManagementClient";
import { NodeJsPackageManagementClient } from "./NodeJsPackageManagementClient";
import * as ledgerIdentityService from "../generated/com/daml/ledger/api/v1/ledger_identity_service_grpc_pb";
import * as partyManagementService from "../generated/com/daml/ledger/api/v1/admin/party_management_service_grpc_pb";
import * as packageManagementService from "../generated/com/daml/ledger/api/v1/admin/package_management_service_grpc_pb";
import { GetLedgerIdentityRequest } from "../generated/com/daml/ledger/api/v1/ledger_identity_service_pb";
import * as activeContractsService from "../generated/com/daml/ledger/api/v1/active_contracts_service_grpc_pb";
import * as commandService from "../generated/com/daml/ledger/api/v1/command_service_grpc_pb";
import * as commandCompletionService from "../generated/com/daml/ledger/api/v1/command_completion_service_grpc_pb";
import * as commandSubmissionService from "../generated/com/daml/ledger/api/v1/command_submission_service_grpc_pb";
import * as packageService from "../generated/com/daml/ledger/api/v1/package_service_grpc_pb";
import * as ledgerConfigurationService from "../generated/com/daml/ledger/api/v1/ledger_configuration_service_grpc_pb";
import * as timeService from "../generated/com/daml/ledger/api/v1/testing/time_service_grpc_pb";
import * as transactionService from "../generated/com/daml/ledger/api/v1/transaction_service_grpc_pb";
import * as resetService from "../generated/com/daml/ledger/api/v1/testing/reset_service_grpc_pb";
import { NodeJsCommandClient } from "./NodeJsCommandClient";
import { NodeJsActiveContractsClient } from "./NodeJsActiveContractsClient";
import { NodeJsCommandCompletionClient } from "./NodeJsCommandCompletionClient";
import { CommandSubmissionClient } from "./CommandSubmissionClient";
import { NodeJsLedgerConfigurationClient } from "./NodeJsLedgerConfigurationClient";
import { LedgerIdentityClient } from "./LedgerIdentityClient";
import { PackageClient } from "./PackageClient";
import { promisify } from "util";
import { ResetClient } from "./ResetClient";
import { NodeJsTimeClient } from "./NodeJsTimeClient";
import { NodeJsTransactionClient } from "./NodeJsTransactionClient";
import { PartyManagementClient } from './PartyManagementClient';
import { PackageManagementClient } from './PackageManagementClient';

/**
 * A {@link LedgerClient} implementation that connects to an existing Ledger and provides clients to query it. To use the {@link DamlLedgerClient}
 * call the static `connect` method, passing an instance of {@link LedgerClientOptions} with the host, port and (for secure connection) the
 * necessary certificates.
 */
export class DamlLedgerClient implements LedgerClient {
    public readonly ledgerId: string;
    private readonly _activeContractsClient: ActiveContractsClient;
    private readonly _commandClient: CommandClient;
    private readonly _commandCompletionClient: CommandCompletionClient;
    private readonly _commandSubmissionClient: CommandSubmissionClient;
    private readonly _ledgerIdentityClient: LedgerIdentityClient;
    private readonly _packageClient: PackageClient;
    private readonly _ledgerConfigurationClient: LedgerConfigurationClient;
    private readonly _timeClient: TimeClient;
    private readonly _transactionClient: TransactionClient;
    private readonly _resetClient: ResetClient;
    private readonly _partyManagementClient: PartyManagementClient;
    private readonly _packageManagementClient: PackageManagementClient;

    private static readonly LedgerIdentityServiceClient =
        makeClientConstructor((ledgerIdentityService as any)['com.daml.ledger.api.v1.LedgerIdentityService'], 'LedgerIdentityService');
    private static readonly ActiveContractsServiceClient =
        makeClientConstructor((activeContractsService as any)['com.daml.ledger.api.v1.ActiveContractsService'], 'ActiveContractsService');
    private static readonly CommandServiceClient =
        makeClientConstructor((commandService as any)['com.daml.ledger.api.v1.CommandService'], 'CommandService');
    private static readonly CommandCompletionServiceClient =
        makeClientConstructor((commandCompletionService as any)['com.daml.ledger.api.v1.CommandCompletionService'], 'CommandCompletionService');
    private static readonly CommandSubmissionServiceClient =
        makeClientConstructor((commandSubmissionService as any)['com.daml.ledger.api.v1.CommandSubmissionService'], 'CommandSubmissionService');
    private static readonly PackageServiceClient =
        makeClientConstructor((packageService as any)['com.daml.ledger.api.v1.PackageService'], 'PackageService');
    private static readonly LedgerConfigurationServiceClient =
        makeClientConstructor((ledgerConfigurationService as any)['com.daml.ledger.api.v1.LedgerConfigurationService'], 'LedgerConfigurationService');
    private static readonly TimeServiceClient =
        makeClientConstructor((timeService as any)['com.daml.ledger.api.v1.testing.TimeService'], 'TimeService');
    private static readonly TransactionServiceClient =
        makeClientConstructor((transactionService as any)['com.daml.ledger.api.v1.TransactionService'], 'TransactionService');
    private static readonly ResetServiceClient =
        makeClientConstructor((resetService as any)['com.daml.ledger.api.v1.testing.ResetService'], 'ResetService');
    private static readonly PartyManagementServiceClient =
        makeClientConstructor((partyManagementService as any)['com.daml.ledger.api.v1.admin.PartyManagementService'], 'PartyManagementService');
    private static readonly PackageManagementServiceClient =
        makeClientConstructor((packageManagementService as any)['com.daml.ledger.api.v1.admin.PackageManagementService'], 'PackageManagementService');



    private constructor(
        ledgerId: string,
        address: string,
        credentials: ChannelCredentials,
        reporter: ValidationReporter,
        grpcOptions?: object
    ) {
        this.ledgerId = ledgerId;
        this._activeContractsClient = new NodeJsActiveContractsClient(
            ledgerId,
            new DamlLedgerClient.ActiveContractsServiceClient
                (address, credentials, grpcOptions) as unknown as activeContractsService.ActiveContractsServiceClient,
            reporter
        );
        this._commandClient = new NodeJsCommandClient(
            ledgerId,
            new DamlLedgerClient.CommandServiceClient(address, credentials, grpcOptions) as unknown as commandService.CommandServiceClient,
            reporter
        );
        this._commandCompletionClient = new NodeJsCommandCompletionClient(
            ledgerId,
            new DamlLedgerClient.CommandCompletionServiceClient(address, credentials, grpcOptions) as unknown as commandCompletionService.CommandCompletionServiceClient,
            reporter
        );
        this._commandSubmissionClient = new NodeJsCommandSubmissionClient(
            ledgerId,
            new DamlLedgerClient.CommandSubmissionServiceClient(address, credentials, grpcOptions) as unknown as commandSubmissionService.CommandSubmissionServiceClient,
            reporter
        );
        this._ledgerIdentityClient = new NodeJsLedgerIdentityClient(
            new DamlLedgerClient.LedgerIdentityServiceClient(address, credentials, grpcOptions) as unknown as ledgerIdentityService.LedgerIdentityServiceClient
        );
        this._packageClient = new NodeJsPackageClient(
            ledgerId,
            new DamlLedgerClient.PackageServiceClient(address, credentials, grpcOptions) as unknown as packageService.PackageServiceClient
        );
        this._ledgerConfigurationClient = new NodeJsLedgerConfigurationClient(
            ledgerId,
            new DamlLedgerClient.LedgerConfigurationServiceClient(address, credentials, grpcOptions) as unknown as ledgerConfigurationService.LedgerConfigurationServiceClient
        );
        this._timeClient = new NodeJsTimeClient(
            ledgerId,
            new DamlLedgerClient.TimeServiceClient(address, credentials, grpcOptions) as unknown as timeService.TimeServiceClient,
            reporter
        );
        this._transactionClient = new NodeJsTransactionClient(
            ledgerId,
            new DamlLedgerClient.TransactionServiceClient(address, credentials, grpcOptions) as unknown as transactionService.TransactionServiceClient,
            reporter
        );
        this._resetClient = new NodeJsResetClient(
            ledgerId,
            new DamlLedgerClient.ResetServiceClient(address, credentials, grpcOptions) as unknown as resetService.ResetServiceClient,
        );
        this._partyManagementClient = new NodeJsPartyManagementClient(
            new DamlLedgerClient.PartyManagementServiceClient(address, credentials, grpcOptions) as unknown as partyManagementService.PartyManagementServiceClient,
            reporter
        );

        this._packageManagementClient = new NodeJsPackageManagementClient(
            new DamlLedgerClient.PackageManagementServiceClient(address, credentials, grpcOptions) as unknown as packageManagementService.PackageManagementServiceClient,
            reporter
        )
    }

    get activeContractsClient(): ActiveContractsClient {
        return this._activeContractsClient;
    }

    get commandClient(): CommandClient {
        return this._commandClient;
    }

    get commandCompletionClient(): CommandCompletionClient {
        return this._commandCompletionClient;
    }

    get commandSubmissionClient(): CommandSubmissionClient {
        return this._commandSubmissionClient;
    }

    get ledgerIdentityClient(): LedgerIdentityClient {
        return this._ledgerIdentityClient;
    }

    get packageClient(): PackageClient {
        return this._packageClient;
    }

    get ledgerConfigurationClient(): LedgerConfigurationClient {
        return this._ledgerConfigurationClient;
    }

    get timeClient(): TimeClient {
        return this._timeClient;
    }

    get transactionClient(): TransactionClient {
        return this._transactionClient;
    }

    get resetClient(): ResetClient {
        return this._resetClient;
    }

    get partyManagementClient(): PartyManagementClient {
        return this._partyManagementClient;
    }

    get packageManagementClient(): PackageManagementClient {
        return this._packageManagementClient;
    }

    private static connectCallback(
        options: LedgerClientOptions,
        callback: Callback<LedgerClient>
    ): void {
        let creds: ChannelCredentials;
        if (!options.certChain && !options.privateKey && !options.rootCerts) {
            creds = credentials.createInsecure();
        } else if (options.certChain && options.privateKey && options.rootCerts) {
            creds = credentials.createSsl(
                options.rootCerts,
                options.privateKey,
                options.certChain
            );
        } else {
            setImmediate(() => {
                callback(
                    new Error(
                        `Incomplete information provided to establish a secure connection (certChain: ${!!options.certChain}, privateKey: ${!!options.privateKey}, rootCerts: ${!!options.rootCerts})`
                    )
                );
            });
            return;
        }

        const reporter = options.reporter || HumanReadableReporter;
        const address = `${options.host}:${options.port}`;
        const client = new DamlLedgerClient.LedgerIdentityServiceClient(address, creds) as unknown as ledgerIdentityService.LedgerIdentityServiceClient;

        client.getLedgerIdentity(
            new GetLedgerIdentityRequest(),
            (error, response) => {
                forward(callback, error, response, response => {
                    return new DamlLedgerClient(
                        response.getLedgerId(),
                        address,
                        creds,
                        reporter,
                        options.grpcOptions
                    );
                });
            }
        );
    }

    private static connectPromise: (_: LedgerClientOptions) => Promise<LedgerClient> = promisify(DamlLedgerClient.connectCallback) as (_: LedgerClientOptions) => Promise<LedgerClient>;

    /**
     * Connects a new instance of the {@link DamlLedgerClient} to the
     *
     * @param options The host, port and certificates needed to reach the ledger
     * @param callback A callback that will be either passed an error or the LedgerClient instance in case of successful connection
     */
    static connect(options: LedgerClientOptions): Promise<LedgerClient>
    static connect(options: LedgerClientOptions, callback: Callback<LedgerClient>): void
    static connect(options: LedgerClientOptions, callback?: Callback<LedgerClient>): void | Promise<LedgerClient> {
        return callback ? DamlLedgerClient.connectCallback(options, callback) : DamlLedgerClient.connectPromise(options);
    }

}
