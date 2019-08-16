// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {ChannelCredentials, credentials} from 'grpc';

import {Callback, forward} from '../util/Callback';
import {LedgerClient, LedgerClientOptions} from "./LedgerClient";
import {HumanReadableReporter} from "../reporting/HumanReadableReporter";
import {ActiveContractsClient} from "./ActiveContractsClient";
import {CommandClient} from "./CommandClient";
import {ValidationReporter} from "../reporting/ValidationReporter";
import {CommandCompletionClient} from "./CommandCompletionClient";
import {NodeJsResetClient} from "./NodeJsResetClient";
import {TransactionClient} from "./TransactionClient";
import {TimeClient} from "./TimeClient";
import {LedgerConfigurationClient} from "./LedgerConfigurationClient";
import {NodeJsPackageClient} from "./NodeJsPackageClient";
import {NodeJsLedgerIdentityClient} from "./NodeJsLedgerIdentityClient";
import {NodeJsCommandSubmissionClient} from "./NodeJsCommandSubmissionClient";
import {NodeJsPartyManagementClient} from "./NodeJsPartyManagementClient";

import {LedgerIdentityServiceClient} from "../generated/com/digitalasset/ledger/api/v1/ledger_identity_service_grpc_pb";
import {PartyManagementServiceClient} from "../generated/com/digitalasset/ledger/api/v1/admin/party_management_service_grpc_pb";
import {GetLedgerIdentityRequest} from "../generated/com/digitalasset/ledger/api/v1/ledger_identity_service_pb";
import {ActiveContractsServiceClient} from "../generated/com/digitalasset/ledger/api/v1/active_contracts_service_grpc_pb";
import {CommandServiceClient} from "../generated/com/digitalasset/ledger/api/v1/command_service_grpc_pb";
import {CommandCompletionServiceClient} from "../generated/com/digitalasset/ledger/api/v1/command_completion_service_grpc_pb";
import {CommandSubmissionServiceClient} from "../generated/com/digitalasset/ledger/api/v1/command_submission_service_grpc_pb";
import {PackageServiceClient} from "../generated/com/digitalasset/ledger/api/v1/package_service_grpc_pb";
import {LedgerConfigurationServiceClient} from "../generated/com/digitalasset/ledger/api/v1/ledger_configuration_service_grpc_pb";
import {TimeServiceClient} from "../generated/com/digitalasset/ledger/api/v1/testing/time_service_grpc_pb";
import {TransactionServiceClient} from "../generated/com/digitalasset/ledger/api/v1/transaction_service_grpc_pb";
import {ResetServiceClient} from "../generated/com/digitalasset/ledger/api/v1/testing/reset_service_grpc_pb";
import {NodeJsCommandClient} from "./NodeJsCommandClient";
import {NodeJsActiveContractsClient} from "./NodeJsActiveContractsClient";
import {NodeJsCommandCompletionClient} from "./NodeJsCommandCompletionClient";
import {CommandSubmissionClient} from "./CommandSubmissionClient";
import {NodeJsLedgerConfigurationClient} from "./NodeJsLedgerConfigurationClient";
import {LedgerIdentityClient} from "./LedgerIdentityClient";
import {PackageClient} from "./PackageClient";
import {promisify} from "util";
import {ResetClient} from "./ResetClient";
import {NodeJsTimeClient} from "./NodeJsTimeClient";
import {NodeJsTransactionClient} from "./NodeJsTransactionClient";
import {PartyManagementClient} from './PartyManagementClient';

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

    private constructor(
        ledgerId: string,
        address: string,
        credentials: ChannelCredentials,
        reporter: ValidationReporter
    ) {
        this.ledgerId = ledgerId;
        this._activeContractsClient = new NodeJsActiveContractsClient(
            ledgerId,
            new ActiveContractsServiceClient(address, credentials),
            reporter
        );
        this._commandClient = new NodeJsCommandClient(
            ledgerId,
            new CommandServiceClient(address, credentials),
            reporter
        );
        this._commandCompletionClient = new NodeJsCommandCompletionClient(
            ledgerId,
            new CommandCompletionServiceClient(address, credentials),
            reporter
        );
        this._commandSubmissionClient = new NodeJsCommandSubmissionClient(
            ledgerId,
            new CommandSubmissionServiceClient(address, credentials),
            reporter
        );
        this._ledgerIdentityClient = new NodeJsLedgerIdentityClient(
            new LedgerIdentityServiceClient(address, credentials)
        );
        this._packageClient = new NodeJsPackageClient(
            ledgerId,
            new PackageServiceClient(address, credentials)
        );
        this._ledgerConfigurationClient = new NodeJsLedgerConfigurationClient(
            ledgerId,
            new LedgerConfigurationServiceClient(address, credentials)
        );
        this._timeClient = new NodeJsTimeClient(
            ledgerId,
            new TimeServiceClient(address, credentials),
            reporter
        );
        this._transactionClient = new NodeJsTransactionClient(
            ledgerId,
            new TransactionServiceClient(address, credentials),
            reporter
        );
        this._resetClient = new NodeJsResetClient(
            ledgerId,
            new ResetServiceClient(address, credentials)
        );
        this._partyManagementClient = new NodeJsPartyManagementClient(
            new PartyManagementServiceClient(address, credentials),
            reporter
        );
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

    get partyManagementClient(): PartyManagementClient{
        return this._partyManagementClient;
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
        const client = new LedgerIdentityServiceClient(address, creds);

        client.getLedgerIdentity(
            new GetLedgerIdentityRequest(),
            (error, response) => {
                forward(callback, error, response, response => {
                    return new DamlLedgerClient(
                        response.getLedgerId(),
                        address,
                        creds,
                        reporter
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
