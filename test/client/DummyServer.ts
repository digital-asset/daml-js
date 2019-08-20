// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Metadata, Server, ServerUnaryCall, ServerWriteableStream, ServiceError} from 'grpc';

import {Empty} from 'google-protobuf/google/protobuf/empty_pb';
import {Timestamp} from 'google-protobuf/google/protobuf/timestamp_pb';
import {SinonSpy} from 'sinon';
import {
    GetLedgerIdentityRequest,
    GetLedgerIdentityResponse
} from "../../src/generated/com/digitalasset/ledger/api/v1/ledger_identity_service_pb";
import {LedgerOffset} from "../../src/generated/com/digitalasset/ledger/api/v1/ledger_offset_pb";
import {
    CompletionEndRequest,
    CompletionEndResponse,
    CompletionStreamRequest
} from "../../src/generated/com/digitalasset/ledger/api/v1/command_completion_service_pb";
import {
    GetPackageRequest,
    GetPackageResponse,
    GetPackageStatusRequest,
    GetPackageStatusResponse,
    ListPackagesRequest,
    ListPackagesResponse
} from "../../src/generated/com/digitalasset/ledger/api/v1/package_service_pb";
import {TransactionTree} from "../../src/generated/com/digitalasset/ledger/api/v1/transaction_pb";
import {
    GetFlatTransactionResponse,
    GetLedgerEndRequest,
    GetLedgerEndResponse,
    GetTransactionByEventIdRequest,
    GetTransactionByIdRequest,
    GetTransactionResponse,
    GetTransactionsRequest
} from "../../src/generated/com/digitalasset/ledger/api/v1/transaction_service_pb";
import {GetActiveContractsRequest} from "../../src/generated/com/digitalasset/ledger/api/v1/active_contracts_service_pb";
import {
    SubmitAndWaitForTransactionIdResponse,
    SubmitAndWaitForTransactionResponse,
    SubmitAndWaitForTransactionTreeResponse,
    SubmitAndWaitRequest
} from "../../src/generated/com/digitalasset/ledger/api/v1/command_service_pb";
import {ActiveContractsServiceService} from "../../src/generated/com/digitalasset/ledger/api/v1/active_contracts_service_grpc_pb";
import {CommandServiceService} from "../../src/generated/com/digitalasset/ledger/api/v1/command_service_grpc_pb";
import {CommandCompletionServiceService} from "../../src/generated/com/digitalasset/ledger/api/v1/command_completion_service_grpc_pb";
import {CommandSubmissionServiceService} from "../../src/generated/com/digitalasset/ledger/api/v1/command_submission_service_grpc_pb";
import {SubmitRequest} from "../../src/generated/com/digitalasset/ledger/api/v1/command_submission_service_pb";
import {LedgerIdentityServiceService} from "../../src/generated/com/digitalasset/ledger/api/v1/ledger_identity_service_grpc_pb";
import {PackageServiceService} from "../../src/generated/com/digitalasset/ledger/api/v1/package_service_grpc_pb";
import {LedgerConfigurationServiceService} from "../../src/generated/com/digitalasset/ledger/api/v1/ledger_configuration_service_grpc_pb";
import {GetLedgerConfigurationRequest} from "../../src/generated/com/digitalasset/ledger/api/v1/ledger_configuration_service_pb";
import {TimeServiceService} from "../../src/generated/com/digitalasset/ledger/api/v1/testing/time_service_grpc_pb";
import {
    GetTimeRequest,
    SetTimeRequest
} from "../../src/generated/com/digitalasset/ledger/api/v1/testing/time_service_pb";
import {TransactionServiceService} from "../../src/generated/com/digitalasset/ledger/api/v1/transaction_service_grpc_pb";
import {ResetServiceService} from "../../src/generated/com/digitalasset/ledger/api/v1/testing/reset_service_grpc_pb";
import {
    ListKnownPartiesRequest,
    ListKnownPartiesResponse
} from "../../src/generated/com/digitalasset/ledger/api/v1/admin/party_management_service_pb";
import {PartyManagementServiceService} from "../../src/generated/com/digitalasset/ledger/api/v1/admin/party_management_service_grpc_pb";

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

        this.addService(ActiveContractsServiceService, {
            getActiveContracts(
                call: ServerWriteableStream<GetActiveContractsRequest>
            ): void {
                spy(call.request.getLedgerId());
                call.end();
            }
        });

        this.addService(CommandServiceService, {
            submitAndWait(
                call: ServerUnaryCall<SubmitAndWaitRequest>,
                callback: (
                    error: ServiceError | null,
                    value: Empty | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request.getCommands()!.getLedgerId());
                callback(null, empty);
            },
            submitAndWaitForTransaction(
                call: ServerUnaryCall<SubmitAndWaitRequest>,
                callback: (
                    error: ServiceError | null,
                    value: SubmitAndWaitForTransactionResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request.getCommands()!.getLedgerId());
                callback(null, submitAndWaitForTransactionResponse)
            },
            submitAndWaitForTransactionId(
                call: ServerUnaryCall<SubmitAndWaitRequest>,
                callback: (
                    error: ServiceError | null,
                    value: SubmitAndWaitForTransactionIdResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request.getCommands()!.getLedgerId());
                callback(null, submitAndWaitForTransactionIdResponse)
            },
            submitAndWaitForTransactionTree(
                call: ServerUnaryCall<SubmitAndWaitRequest>,
                callback: (
                    error: ServiceError | null,
                    value: SubmitAndWaitForTransactionTreeResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request.getCommands()!.getLedgerId());
                callback(null, submitAndWaitForTransactionTreeResponse)
            },
        });

        this.addService(CommandCompletionServiceService, {
            completionStream(
                call: ServerWriteableStream<CompletionStreamRequest>
            ): void {
                spy(call.request.getLedgerId());
                call.end();
            },
            completionEnd(
                call: ServerUnaryCall<CompletionEndRequest>,
                callback: (
                    error: ServiceError | null,
                    value: CompletionEndResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request.getLedgerId());
                callback(null, completionEndResponse);
            }
        });

        this.addService(CommandSubmissionServiceService, {
            submit(
                call: ServerUnaryCall<SubmitRequest>,
                callback: (
                    error: ServiceError | null,
                    value: Empty | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request.getCommands()!.getLedgerId());
                callback(null, empty);
            }
        });

        this.addService(LedgerIdentityServiceService, {
            getLedgerIdentity(
                _call: ServerUnaryCall<GetLedgerIdentityRequest>,
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

        this.addService(PackageServiceService, {
            listPackages(
                call: ServerUnaryCall<ListPackagesRequest>,
                callback: (
                    error: ServiceError | null,
                    value: ListPackagesResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request.getLedgerId());
                callback(null, listPackagesResponse);
            },
            getPackage(
                call: ServerUnaryCall<GetPackageRequest>,
                callback: (
                    error: ServiceError | null,
                    value: GetPackageResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request.getLedgerId());
                callback(null, getPackageResponse);
            },
            getPackageStatus(
                call: ServerUnaryCall<GetPackageStatusRequest>,
                callback: (
                    error: ServiceError | null,
                    value: GetPackageStatusResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request.getLedgerId());
                callback(null, getPackageStatusResponse);
            }
        });

        this.addService(LedgerConfigurationServiceService, {
            getLedgerConfiguration(
                call: ServerWriteableStream<GetLedgerConfigurationRequest>
            ): void {
                spy(call.request.getLedgerId());
                call.end();
            }
        });

        this.addService(TimeServiceService, {
            getTime(call: ServerWriteableStream<GetTimeRequest>): void {
                spy(call.request.getLedgerId());
                call.end();
            },
            setTime(
                call: ServerUnaryCall<SetTimeRequest>,
                callback: (
                    error: ServiceError | null,
                    value: Empty | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request.getLedgerId());
                callback(null, empty);
            }
        });

        this.addService(TransactionServiceService, {
            getTransactions(
                call: ServerWriteableStream<GetTransactionsRequest>
            ): void {
                spy(call.request.getLedgerId());
                call.end();
            },
            getTransactionTrees(
                call: ServerWriteableStream<GetTransactionsRequest>
            ): void {
                spy(call.request.getLedgerId());
                call.end();
            },
            getTransactionByEventId(
                call: ServerUnaryCall<GetTransactionByEventIdRequest>,
                callback: (
                    error: ServiceError | null,
                    value: GetTransactionResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request.getLedgerId());
                callback(null, getTransactionResponse);
            },
            getTransactionById(
                call: ServerUnaryCall<GetTransactionByIdRequest>,
                callback: (
                    error: ServiceError | null,
                    value: GetTransactionResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request.getLedgerId());
                callback(null, getTransactionResponse);
            },
            getLedgerEnd(
                call: ServerUnaryCall<GetLedgerEndRequest>,
                callback: (
                    error: ServiceError | null,
                    value: GetLedgerEndResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request.getLedgerId());
                callback(null, getLedgerEndResponse);
            },
            getFlatTransactionByEventId(
                call: ServerUnaryCall<GetTransactionByEventIdRequest>,
                callback: (
                    error: ServiceError | null,
                    value: GetFlatTransactionResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request.getLedgerId());
                callback(null, getFlatTransactionResponse);
            },
            getFlatTransactionById(
                call: ServerUnaryCall<GetTransactionByIdRequest>,
                callback: (
                    error: ServiceError | null,
                    value: GetFlatTransactionResponse | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request.getLedgerId());
                callback(null, getFlatTransactionResponse);
            }
        });

        this.addService(ResetServiceService, {
            reset(
                call: ServerUnaryCall<SetTimeRequest>,
                callback: (
                    error: ServiceError | null,
                    value: Empty | null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                spy(call.request.getLedgerId());
                callback(null, empty);
            }
        });

        this.addService(PartyManagementServiceService, {
            // This is not needed for now
            getParticipantId(
                _call: null,
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
                _call: ServerUnaryCall<ListKnownPartiesRequest>,
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
                _call: null,
                callback: (
                    error: ServiceError | null,
                    value: null,
                    trailer?: Metadata,
                    flags?: number
                ) => void
            ): void {
                callback(null, null);
            }
        })
    }
}
