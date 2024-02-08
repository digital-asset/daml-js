// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Metadata, Server, ServerUnaryCall, ServerWritableStream, ServiceError} from '@grpc/grpc-js';

import {Empty} from 'google-protobuf/google/protobuf/empty_pb';
import {Timestamp} from 'google-protobuf/google/protobuf/timestamp_pb';
import {SinonSpy} from 'sinon';
import {
    GetLedgerIdentityRequest,
    GetLedgerIdentityResponse
} from "../../src/generated/com/daml/ledger/api/v1/ledger_identity_service_pb";
import {LedgerOffset} from "../../src/generated/com/daml/ledger/api/v1/ledger_offset_pb";
import {
    CompletionEndRequest,
    CompletionEndResponse,
    CompletionStreamRequest
} from "../../src/generated/com/daml/ledger/api/v1/command_completion_service_pb";
import {
    GetPackageRequest,
    GetPackageResponse,
    GetPackageStatusRequest,
    GetPackageStatusResponse,
    ListPackagesRequest,
    ListPackagesResponse
} from "../../src/generated/com/daml/ledger/api/v1/package_service_pb";
import {TransactionTree} from "../../src/generated/com/daml/ledger/api/v1/transaction_pb";
import {
    GetFlatTransactionResponse,
    GetLedgerEndRequest,
    GetLedgerEndResponse,
    GetTransactionByEventIdRequest,
    GetTransactionByIdRequest,
    GetTransactionResponse,
    GetTransactionsRequest,
    GetTransactionsResponse,
    GetTransactionTreesResponse,
} from "../../src/generated/com/daml/ledger/api/v1/transaction_service_pb";
import {GetActiveContractsRequest} from "../../src/generated/com/daml/ledger/api/v1/active_contracts_service_pb";
import {
    SubmitAndWaitForTransactionIdResponse,
    SubmitAndWaitForTransactionResponse,
    SubmitAndWaitForTransactionTreeResponse,
    SubmitAndWaitRequest
} from "../../src/generated/com/daml/ledger/api/v1/command_service_pb";
import * as activeContractsService from "../../src/generated/com/daml/ledger/api/v1/active_contracts_service_grpc_pb";
import * as commandService from "../../src/generated/com/daml/ledger/api/v1/command_service_grpc_pb";
import * as commandCompletionService from "../../src/generated/com/daml/ledger/api/v1/command_completion_service_grpc_pb";
import * as commandSubmissionService from "../../src/generated/com/daml/ledger/api/v1/command_submission_service_grpc_pb";
import {SubmitRequest} from "../../src/generated/com/daml/ledger/api/v1/command_submission_service_pb";
import * as ledgerIdentityService from "../../src/generated/com/daml/ledger/api/v1/ledger_identity_service_grpc_pb";
import * as packageService from "../../src/generated/com/daml/ledger/api/v1/package_service_grpc_pb";
import * as ledgerConfigurationService from "../../src/generated/com/daml/ledger/api/v1/ledger_configuration_service_grpc_pb";
import {GetLedgerConfigurationRequest} from "../../src/generated/com/daml/ledger/api/v1/ledger_configuration_service_pb";
import * as timeService from "../../src/generated/com/daml/ledger/api/v1/testing/time_service_grpc_pb";
import {
    GetTimeRequest,
    SetTimeRequest
} from "../../src/generated/com/daml/ledger/api/v1/testing/time_service_pb";
import * as transactionService from "../../src/generated/com/daml/ledger/api/v1/transaction_service_grpc_pb";
import * as resetService from "../../src/generated/com/daml/ledger/api/v1/testing/reset_service_grpc_pb";
import {
    ListKnownPartiesRequest,
    ListKnownPartiesResponse
} from "../../src/generated/com/daml/ledger/api/v1/admin/party_management_service_pb";
import * as partyManagementService from "../../src/generated/com/daml/ledger/api/v1/admin/party_management_service_grpc_pb";
import {
    ListKnownPackagesRequest,
    ListKnownPackagesResponse,
    UploadDarFileRequest,
    UploadDarFileResponse
} from "../../src/generated/com/daml/ledger/api/v1/admin/package_management_service_pb";
import * as packageManagementService from "../../src/generated/com/daml/ledger/api/v1/admin/package_management_service_grpc_pb";
import { GetActiveContractsResponse, CompletionStreamResponse, GetLedgerConfigurationResponse, GetTimeResponse } from '../../src';
export class DummyServer extends Server {
    constructor(ledgerId: string, spy: SinonSpy) {
        super();

        const ledgerIdentityResponse: GetLedgerIdentityResponse = new GetLedgerIdentityResponse();
        ledgerIdentityResponse.setLedgerId(ledgerId);

        const listKnownPartiesResponse: ListKnownPartiesResponse = new ListKnownPartiesResponse();

        const empty = new Empty();

        const offset = new LedgerOffset();
        offset.setBoundary(LedgerOffset.LedgerBoundary.LEDGER_BEGIN);

        const completionEndResponse = new CompletionEndResponse();
        completionEndResponse.setOffset(offset);

        const listPackagesResponse = new ListPackagesResponse();

        const getPackageResponse = new GetPackageResponse();

        const getPackageStatusResponse = new GetPackageStatusResponse();

        const effectiveAt = new Timestamp();
        const transactionTree = new TransactionTree();
        transactionTree.setEffectiveAt(effectiveAt);
        const getTransactionResponse = new GetTransactionResponse();
        getTransactionResponse.setTransaction(transactionTree);

        const getLedgerEndResponse = new GetLedgerEndResponse();
        getLedgerEndResponse.setOffset(offset);

        const getFlatTransactionResponse = new GetFlatTransactionResponse();

        const submitAndWaitForTransactionResponse = new SubmitAndWaitForTransactionResponse();
        const submitAndWaitForTransactionIdResponse = new SubmitAndWaitForTransactionIdResponse();
        const submitAndWaitForTransactionTreeResponse = new SubmitAndWaitForTransactionTreeResponse();

        const listKnownPackagesResponse = new ListKnownPackagesResponse();

        this.addService((activeContractsService as any)['com.daml.ledger.api.v1.ActiveContractsService'], {
            getActiveContracts(
                call: ServerWritableStream<GetActiveContractsRequest, GetActiveContractsResponse>
            ): void {
                spy(call.request!.getLedgerId());
                call.end();
            }
        });

        this.addService((commandService as any)['com.daml.ledger.api.v1.CommandService'], {
            submitAndWait(
                call: ServerUnaryCall<SubmitAndWaitRequest, Empty>,
                callback: (
                    error: ServiceError | null,
                    value: Empty | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request!.getCommands()!.getLedgerId());
                callback(null, empty);
            },
            submitAndWaitForTransaction(
                call: ServerUnaryCall<SubmitAndWaitRequest, SubmitAndWaitForTransactionResponse>,
                callback: (
                    error: ServiceError | null,
                    value: SubmitAndWaitForTransactionResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request!.getCommands()!.getLedgerId());
                callback(null, submitAndWaitForTransactionResponse)
            },
            submitAndWaitForTransactionId(
                call: ServerUnaryCall<SubmitAndWaitRequest, SubmitAndWaitForTransactionIdResponse>,
                callback: (
                    error: ServiceError | null,
                    value: SubmitAndWaitForTransactionIdResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request!.getCommands()!.getLedgerId());
                callback(null, submitAndWaitForTransactionIdResponse)
            },
            submitAndWaitForTransactionTree(
                call: ServerUnaryCall<SubmitAndWaitRequest, SubmitAndWaitForTransactionTreeResponse>,
                callback: (
                    error: ServiceError | null,
                    value: SubmitAndWaitForTransactionTreeResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request!.getCommands()!.getLedgerId());
                callback(null, submitAndWaitForTransactionTreeResponse)
            },
        });

        this.addService((commandCompletionService as any)['com.daml.ledger.api.v1.CommandCompletionService'], {
            completionStream(
                call: ServerWritableStream<CompletionStreamRequest, CompletionStreamResponse>
            ): void {
                spy(call.request!.getLedgerId());
                call.end();
            },
            completionEnd(
                call: ServerUnaryCall<CompletionEndRequest, CompletionStreamResponse>,
                callback: (
                    error: ServiceError | null,
                    value: CompletionEndResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request!.getLedgerId());
                callback(null, completionEndResponse);
            }
        });

        this.addService((commandSubmissionService as any)['com.daml.ledger.api.v1.CommandSubmissionService'], {
            submit(
                call: ServerUnaryCall<SubmitRequest, Empty>,
                callback: (
                    error: ServiceError | null,
                    value: Empty | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request!.getCommands()!.getLedgerId());
                callback(null, empty);
            }
        });

        this.addService((ledgerIdentityService as any)['com.daml.ledger.api.v1.LedgerIdentityService'], {
            getLedgerIdentity(
                _call: ServerUnaryCall<GetLedgerIdentityRequest, GetLedgerIdentityResponse>,
                callback: (
                    error: ServiceError | null,
                    value: GetLedgerIdentityResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                callback(null, ledgerIdentityResponse);
            }
        });

        this.addService((packageService as any)['com.daml.ledger.api.v1.PackageService'], {
            listPackages(
                call: ServerUnaryCall<ListPackagesRequest, ListPackagesResponse>,
                callback: (
                    error: ServiceError | null,
                    value: ListPackagesResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request!.getLedgerId());
                callback(null, listPackagesResponse);
            },
            getPackage(
                call: ServerUnaryCall<GetPackageRequest, GetPackageResponse>,
                callback: (
                    error: ServiceError | null,
                    value: GetPackageResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request!.getLedgerId());
                callback(null, getPackageResponse);
            },
            getPackageStatus(
                call: ServerUnaryCall<GetPackageStatusRequest, GetPackageStatusResponse>,
                callback: (
                    error: ServiceError | null,
                    value: GetPackageStatusResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request!.getLedgerId());
                callback(null, getPackageStatusResponse);
            }
        });

        this.addService((ledgerConfigurationService as any)['com.daml.ledger.api.v1.LedgerConfigurationService'], {
            getLedgerConfiguration(
                call: ServerWritableStream<GetLedgerConfigurationRequest, GetLedgerConfigurationResponse>
            ): void {
                spy(call.request!.getLedgerId());
                call.end();
            }
        });

        this.addService((timeService as any)['com.daml.ledger.api.v1.testing.TimeService'], {
            getTime(call: ServerWritableStream<GetTimeRequest, GetTimeResponse>): void {
                spy(call.request!.getLedgerId());
                call.end();
            },
            setTime(
                call: ServerUnaryCall<SetTimeRequest, Empty>,
                callback: (
                    error: ServiceError | null,
                    value: Empty | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request!.getLedgerId());
                callback(null, empty);
            }
        });

        this.addService((transactionService as any)['com.daml.ledger.api.v1.TransactionService'], {
            getTransactions(
                call: ServerWritableStream<GetTransactionsRequest, GetTransactionsResponse>
            ): void {
                spy(call.request!.getLedgerId());
                call.end();
            },
            getTransactionTrees(
                call: ServerWritableStream<GetTransactionsRequest, GetTransactionTreesResponse>
            ): void {
                spy(call.request!.getLedgerId());
                call.end();
            },
            getTransactionByEventId(
                call: ServerUnaryCall<GetTransactionByEventIdRequest, GetTransactionResponse>,
                callback: (
                    error: ServiceError | null,
                    value: GetTransactionResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request!.getLedgerId());
                callback(null, getTransactionResponse);
            },
            getTransactionById(
                call: ServerUnaryCall<GetTransactionByIdRequest, GetTransactionResponse>,
                callback: (
                    error: ServiceError | null,
                    value: GetTransactionResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request!.getLedgerId());
                callback(null, getTransactionResponse);
            },
            getLedgerEnd(
                call: ServerUnaryCall<GetLedgerEndRequest, GetLedgerEndResponse>,
                callback: (
                    error: ServiceError | null,
                    value: GetLedgerEndResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request!.getLedgerId());
                callback(null, getLedgerEndResponse);
            },
            getFlatTransactionByEventId(
                call: ServerUnaryCall<GetTransactionByEventIdRequest, GetFlatTransactionResponse>,
                callback: (
                    error: ServiceError | null,
                    value: GetFlatTransactionResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request!.getLedgerId());
                callback(null, getFlatTransactionResponse);
            },
            getFlatTransactionById(
                call: ServerUnaryCall<GetTransactionByIdRequest, GetFlatTransactionResponse>,
                callback: (
                    error: ServiceError | null,
                    value: GetFlatTransactionResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request!.getLedgerId());
                callback(null, getFlatTransactionResponse);
            }
        });

        this.addService((resetService as any)['com.daml.ledger.api.v1.testing.ResetService'], {
            reset(
                call: ServerUnaryCall<SetTimeRequest, Empty>,
                callback: (
                    error: ServiceError | null,
                    value: Empty | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request!.getLedgerId());
                callback(null, empty);
            }
        });

        this.addService((partyManagementService as any)['com.daml.ledger.api.v1.admin.PartyManagementService'], {
            // This is not needed for now
            getParticipantId(
                _call: {request : null},
                callback: (
                    error: ServiceError | null,
                    value: null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                callback(null, null);
            },
            getParties(
                _call: {request: null},
                callback: (
                    error: ServiceError | null,
                    value: null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                callback(null, null);
            },
            listKnownParties(
                _call: ServerUnaryCall<ListKnownPartiesRequest, ListKnownPartiesResponse>,
                callback: (
                    error: ServiceError | null,
                    value: ListKnownPartiesResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                callback(null, listKnownPartiesResponse);
            },
            // This is not needed
            allocateParty(
                _call: {request: null},
                callback: (
                    error: ServiceError | null,
                    value: null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                callback(null, null);
            }
        });

        this.addService((packageManagementService as any)['com.daml.ledger.api.v1.admin.PackageManagementService'], {
            listKnownPackages(
                _call: ServerUnaryCall<ListKnownPackagesRequest, ListKnownPackagesResponse>,
                callback: (
                    error: ServiceError | null,
                    value: ListKnownPackagesResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                callback(null, listKnownPackagesResponse);
            },
            uploadDarFile(
                _call: ServerUnaryCall<UploadDarFileRequest, UploadDarFileResponse>,
                callback: (
                    error: ServiceError | null,
                    value: void | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                callback(null, null);
            }
        });
    }
}
