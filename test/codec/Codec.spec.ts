// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {expect} from 'chai';

import {
    Transaction as PbTransaction,
    TransactionTree as PbTransactionTree,
    TreeEvent as PbTreeEvent
} from "../../src/generated/com/digitalasset/ledger/api/v1/transaction_pb";

import {Timestamp as PbTimestamp} from 'google-protobuf/google/protobuf/timestamp_pb';
import {Empty as PbEmpty} from 'google-protobuf/google/protobuf/empty_pb';

import {Identifier} from "../../src/model/Identifier";
import {
    Identifier as PbIdentifier,
    List as PbList,
    Map as PbMap,
    Record as PbRecord,
    RecordField as PbRecordField,
    Value as PbValue,
    Variant as PbVariant
} from "../../src/generated/com/digitalasset/ledger/api/v1/value_pb";
import {
    ArchivedEvent as PbArchivedEvent,
    CreatedEvent as PbCreatedEvent,
    Event as PbEvent,
    ExercisedEvent as PbExercisedEvent
} from "../../src/generated/com/digitalasset/ledger/api/v1/event_pb";
import {InclusiveFilters} from "../../src/model/InclusiveFilters";
import {
    Filters as PbFilters,
    InclusiveFilters as PbInclusiveFilters,
    TransactionFilter as PbTransactionFilter
} from "../../src/generated/com/digitalasset/ledger/api/v1/transaction_filter_pb";
import {Filters} from "../../src/model/Filters";
import {TransactionFilter} from "../../src/model/TransactionFilter";
import {Codec} from "../../src/codec/Codec";
import {Record} from "../../src/model/Record";
import {SetTimeRequest} from "../../src/model/SetTimeRequest";
import {
    GetTimeResponse as PbGetTimeResponse,
    SetTimeRequest as PbSetTimeRequest
} from "../../src/generated/com/digitalasset/ledger/api/v1/testing/time_service_pb";
import {SetTimeRequestCodec} from "../../src/codec/SetTimeRequestCodec";
import {GetTimeResponseCodec} from "../../src/codec/GetTimeResponseCodec";
import {GetTimeResponse} from "../../src/model/GetTimeResponse";
import {GetTransactionTreesResponseCodec} from "../../src/codec/GetTransactionTreesResponseCodec";
import {GetTransactionTreesResponse} from "../../src/model/GetTransactionTreesResponse";
import {
    GetLedgerEndResponse as PbGetLedgerEndResponse,
    GetTransactionByEventIdRequest as PbGetTransactionByEventIdRequest,
    GetTransactionByIdRequest as PbGetTransactionByIdRequest,
    GetTransactionResponse as PbGetTransactionResponse,
    GetTransactionsRequest as PbGetTransactionsRequest,
    GetTransactionsResponse as PbGetTransactionsResponse,
    GetTransactionTreesResponse as PbGetTransactionTreesResponse
} from "../../src/generated/com/digitalasset/ledger/api/v1/transaction_service_pb";
import {GetTransactionsResponseCodec} from "../../src/codec/GetTransactionsResponseCodec";
import {GetTransactionsResponse} from "../../src/model/GetTransactionsResponse";
import {TransactionCodec} from "../../src/codec/TransactionCodec";
import {Transaction} from "../../src/model/Transaction";
import {CreateCommand} from "../../src/model/CreateCommand";
import {
    Command as PbCommand,
    Commands as PbCommands,
    CreateCommand as PbCreateCommand,
    ExerciseCommand as PbExerciseCommand,
    CreateAndExerciseCommand as  PbCreateAndExerciseCommand
} from "../../src/generated/com/digitalasset/ledger/api/v1/commands_pb";
import {ExerciseCommand} from "../../src/model/ExerciseCommand";
import {Commands} from "../../src/model/Commands";
import {CreatedEvent} from "../../src/model/CreatedEvent";
import {IdentifierCodec} from "../../src/codec/IdentifierCodec";
import {InclusiveFiltersCodec} from "../../src/codec/InclusiveFiltersCodec";
import {FiltersCodec} from "../../src/codec/FiltersCodec";
import {TransactionFilterCodec} from "../../src/codec/TransactionFilterCodec";
import {LedgerOffset, LedgerOffsetBoundaryValue} from "../../src/model/LedgerOffset";
import {LedgerOffset as PbLedgerOffset} from "../../src/generated/com/digitalasset/ledger/api/v1/ledger_offset_pb";
import {LedgerOffsetCodec} from "../../src/codec/LedgerOffsetCodec";
import {Timestamp} from "../../src/model/Timestamp";
import {TimestampCodec} from "../../src/codec/TimestampCodec";
import {ValueCodec} from "../../src/codec/ValueCodec";
import {Value} from "../../src/model/Value";
import {RecordCodec} from "../../src/codec/RecordCodec";
import {CreateCommandCodec} from "../../src/codec/CreateCommandCodec";
import {ExerciseCommandCodec} from "../../src/codec/ExerciseCommandCodec";
import {CommandCodec} from "../../src/codec/CommandCodec";
import {CommandsCodec} from "../../src/codec/CommandsCodec";
import {SubmitRequestCodec} from "../../src/codec/SubmitRequestCodec";
import {GetTransactionsRequest} from "../../src/model/GetTransactionsRequest";
import {GetTransactionsRequestCodec} from "../../src/codec/GetTransactionsRequestCodec";
import {GetActiveContractsRequest} from "../../src/model/GetActiveContractsRequest";
import {
    GetActiveContractsRequest as PbGetActiveContractsRequest,
    GetActiveContractsResponse as PbGetActiveContractsResponse
} from "../../src/generated/com/digitalasset/ledger/api/v1/active_contracts_service_pb";
import {GetActiveContractsRequestCodec} from "../../src/codec/GetActiveContractsRequestCodec";
import {CreatedEventCodec} from "../../src/codec/CreatedEventCodec";
import {GetActiveContractsResponseCodec} from "../../src/codec/GetActiveContractsResponseCodec";
import {GetActiveContractsResponse} from "../../src/model/GetActiveContractsResponse";
import {GetLedgerIdentityResponse} from "../../src/model/GetLedgerIdentityResponse";
import {GetLedgerIdentityResponse as PbGetLedgerIdentityResponse} from "../../src/generated/com/digitalasset/ledger/api/v1/ledger_identity_service_pb";
import {GetLedgerIdentityResponseCodec} from "../../src/codec/GetLedgerIdentityResponseCodec";
import {GetPackageResponse} from "../../src/model/GetPackageResponse";
import {
    GetPackageResponse as PbGetPackageResponse,
    HashFunction as PbHashFunction,
    ListPackagesResponse as PbListPackagesResponse
} from "../../src/generated/com/digitalasset/ledger/api/v1/package_service_pb";
import {HashFunction} from "../../src/model/HashFunction";
import {GetPackageResponseCodec} from "../../src/codec/GetPackageResponseCodec";
import {ListPackagesResponse} from "../../src/model/ListPackagesResponse";
import {ListPackagesResponseCodec} from "../../src/codec/ListPackagesResponseCodec";
import {SubmitAndWaitRequestCodec} from "../../src/codec/SubmitAndWaitRequestCodec";
import {CompletionEndResponseCodec} from "../../src/codec/CompletionEndResponseCodec";
import {CompletionEndResponse} from "../../src/model/CompletionEndResponse";
import {
    Checkpoint as PbCheckpoint,
    CompletionEndResponse as PbCompletionEndResponse,
    CompletionStreamRequest as PbCompletionStreamRequest,
    CompletionStreamResponse as PbCompletionStreamResponse
} from "../../src/generated/com/digitalasset/ledger/api/v1/command_completion_service_pb";
import {CompletionStreamRequest} from "../../src/model/CompletionStreamRequest";
import {Checkpoint} from "../../src/model/Checkpoint";
import {CompletionStreamRequestCodec} from "../../src/codec/CompletionStreamRequestCodec";
import {CheckpointCodec} from "../../src/codec/CheckpointCodec";
import {Event} from "../../src/model/Event";
import {Any} from "../../src/model/Any";
import {Any as PbAny} from "google-protobuf/google/protobuf/any_pb";
import {AnyCodec} from "../../src/codec/AnyCodec";
import {Status} from "../../src/model/Status";
import {Status as PbStatus} from "../../src/generated/google/rpc/status_pb";
import {StatusCodec} from "../../src/codec/StatusCodec";
import {Completion} from "../../src/model/Completion";
import {Completion as PbCompletion} from "../../src/generated/com/digitalasset/ledger/api/v1/completion_pb";
import {CompletionCodec} from "../../src/codec/CompletionCodec";
import {CompletionStreamResponse} from "../../src/model/CompletionStreamResponse";
import {CompletionStreamResponseCodec} from "../../src/codec/CompletionStreamResponseCodec";
import {Duration} from "../../src/model/Duration";
import {Duration as PbDuration} from "google-protobuf/google/protobuf/duration_pb";
import {DurationCodec} from "../../src/codec/DurationCodec";
import {LedgerConfiguration} from "../../src/model/LedgerConfiguration";
import {
    GetLedgerConfigurationResponse as PbGetLedgerConfigurationResponse,
    LedgerConfiguration as PbLedgerConfiguration
} from "../../src/generated/com/digitalasset/ledger/api/v1/ledger_configuration_service_pb";
import {LedgerConfigurationCodec} from "../../src/codec/LedgerConfigurationCodec";
import {GetLedgerConfigurationResponse} from "../../src/model/GetLedgerConfigurationResponse";
import {GetLedgerConfigurationResponseCodec} from "../../src/codec/GetLedgerConfigurationResponseCodec";
import {GetLedgerEndResponse} from "../../src/model/GetLedgerEndResponse";
import {GetLedgerEndResponseCodec} from "../../src/codec/GetLedgerEndResponseCodec";
import {GetTransactionByEventIdRequest} from "../../src/model/GetTransactionByEventIdRequest";
import {GetTransactionByEventIdRequestCodec} from "../../src/codec/GetTransactionByEventIdRequestCodec";
import {GetTransactionByIdRequest} from "../../src/model/GetTransactionByIdRequest";
import {GetTransactionByIdRequestCodec} from "../../src/codec/GetTransactionByIdRequestCodec";
import {ArchivedEvent} from "../../src/model/ArchivedEvent";
import {ArchivedEventCodec} from "../../src/codec/ArchivedEventCodec";
import {ExercisedEvent} from "../../src/model/ExercisedEvent";
import {ExercisedEventCodec} from "../../src/codec/ExercisedEventCodec";
import {EventCodec} from "../../src/codec/EventCodec";
import {TransactionTree} from "../../src/model/TransactionTree";
import {TransactionTreeCodec} from "../../src/codec/TransactionTreeCodec";
import {GetTransactionResponse} from "../../src/model/GetTransactionResponse";
import {GetTransactionResponseCodec} from "../../src/codec/GetTransactionResponseCodec";
import {SubmitRequest} from "../../src/model/SubmitRequest";
import {SubmitRequest as PbSubmitRequest} from "../../src/generated/com/digitalasset/ledger/api/v1/command_submission_service_pb";
import {SubmitAndWaitRequest} from "../../src/model/SubmitAndWaitRequest";
import {SubmitAndWaitRequest as PbSubmitAndWaitRequest} from "../../src/generated/com/digitalasset/ledger/api/v1/command_service_pb";
import {SubmitAndWaitForTransactionResponse} from "../../src/model/SubmitAndWaitForTransactionResponse";
import {SubmitAndWaitForTransactionResponse as PbSubmitAndWaitForTransactionResponse} from "../../src/generated/com/digitalasset/ledger/api/v1/command_service_pb";
import {SubmitAndWaitForTransactionIdResponse} from "../../src/model/SubmitAndWaitForTransactionIdResponse";
import {SubmitAndWaitForTransactionIdResponse as PbSubmitAndWaitForTransactionIdResponse} from "../../src/generated/com/digitalasset/ledger/api/v1/command_service_pb";
import {SubmitAndWaitForTransactionTreeResponse} from "../../src/model/SubmitAndWaitForTransactionTreeResponse";
import {SubmitAndWaitForTransactionTreeResponse as PbSubmitAndWaitForTransactionTreeResponse} from "../../src/generated/com/digitalasset/ledger/api/v1/command_service_pb";
import {CreateAndExerciseCommandCodec} from "../../src/codec/CreateAndExerciseCommandCodec";
import {CreateAndExerciseCommand} from "../../src/model/CreateAndExerciseCommand";
import {SubmitAndWaitForTransactionResponseCodec} from "../../src/codec/SubmitAndWaitForTransactionResponseCodec";
import {SubmitAndWaitForTransactionIdResponseCodec} from "../../src/codec/SubmitAndWaitForTransactionIdResponseCodec";
import {SubmitAndWaitForTransactionTreeResponseCodec} from "../../src/codec/SubmitAndWaitForTransactionTreeResponseCodec";
import {ListKnownPartiesResponse} from "../../src/model/ListKnownPartiesResponse";
import {ListKnownPartiesResponse as PbListKnownPartiesResponse, PartyDetails as PbPartyDetails, AllocatePartyRequest as PbAllocatePartyRequest, AllocatePartyResponse as PbAllocatePartyResponse} from "../../src/generated/com/digitalasset/ledger/api/v1/admin/party_management_service_pb";
import {PartyDetails} from "../../src/model/PartyDetails";
import {ListKnownPartiesResponseCodec} from "../../src/codec/ListKnownPartiesResponseCodec";
import {PartyDetailsCodec} from '../../src/codec/PartyDetailsCodec';
import {AllocatePartyRequestCodec} from "../../src/codec/AllocatePartyRequestCodec";
import {AllocatePartyResponseCodec} from "../../src/codec/AllocatePartyResponseCodec";
import {AllocatePartyRequest} from "../../src/model/AllocatePartyRequest";
import {AllocatePartyResponse} from "../../src/model/AllocatePartyResponse";


describe('Codec', () => {
    const packageId = 'packageId';
    const moduleName = 'moduleName';
    const entityName = 'entityName';

    const identifierObject: Identifier = {
        packageId: packageId,
        moduleName: moduleName,
        entityName: entityName
    };

    const inclusiveFiltersObject: InclusiveFilters = {
        templateIds: [identifierObject]
    };

    const filtersObject: Filters = {
        inclusive: inclusiveFiltersObject
    };

    const transactionFilterObject: TransactionFilter = {
        filtersByParty: {
            Alice: filtersObject,
            Bob: {}
        }
    };

    const identifierMessage = new PbIdentifier();
    identifierMessage.setPackageId(packageId);
    identifierMessage.setModuleName(moduleName);
    identifierMessage.setEntityName(entityName);

    const inclusiveFiltersMessage = new PbInclusiveFilters();
    inclusiveFiltersMessage.setTemplateIdsList([identifierMessage]);

    const filtersMessage = new PbFilters();
    filtersMessage.setInclusive(inclusiveFiltersMessage);

    const transactionFilterMessage = new PbTransactionFilter();
    transactionFilterMessage.getFiltersByPartyMap().set('Alice', filtersMessage);
    transactionFilterMessage
        .getFiltersByPartyMap()
        .set('Bob', new PbFilters());

    const textValue = new PbValue();
    textValue.setText('text');
    const textField = new PbRecordField();
    textField.setLabel('textLabel');
    textField.setValue(textValue);
    const dateValue = new PbValue();
    dateValue.setDate(40);
    const dateField = new PbRecordField();
    dateField.setLabel('dateLabel');
    dateField.setValue(dateValue);
    const partyValue = new PbValue();
    partyValue.setParty('Bob');
    const partyField = new PbRecordField();
    partyField.setLabel('partyLabel');
    partyField.setValue(partyValue);
    const mapField = new PbRecordField();
    mapField.setLabel('mapLabel');
    const mapValue = new PbValue();
    const map = new PbMap();
    const mapEntries: PbMap.Entry[] = [];
    const mapEntry = new PbMap.Entry();
    mapEntry.setKey('partyLabel');
    const mapEntryPartyValue = new PbValue();
    mapEntryPartyValue.setParty('Charlie');
    mapEntry.setValue(mapEntryPartyValue);
    mapEntries.push(mapEntry);
    map.setEntriesList(mapEntries);
    mapValue.setMap(map);
    mapField.setValue(mapValue);
    const nestedRecord = new PbRecord();
    nestedRecord.setRecordId(identifierMessage);
    nestedRecord.setFieldsList([partyField, mapField]);
    const nestedValue = new PbValue();
    nestedValue.setRecord(nestedRecord);
    const nestedField = new PbRecordField();
    nestedField.setLabel('nestedLabel');
    nestedField.setValue(nestedValue);
    const recordMessage = new PbRecord();
    recordMessage.setRecordId(identifierMessage);
    recordMessage.setFieldsList([textField, dateField, nestedField]);

    const recordObject: Record = {
        recordId: identifierObject,
        fields: {
            textLabel: {valueType: 'text', text: 'text'},
            dateLabel: {valueType: 'date', date: '40'},
            nestedLabel: {
                valueType: 'record',
                recordId: identifierObject,
                fields: {
                    partyLabel: {valueType: 'party', party: 'Bob'},
                    mapLabel: {valueType: 'map', map: { partyLabel: {valueType: 'party', party: 'Charlie'} } }
                }
            }
        }
    };

    const createCommandMessage = new PbCreateCommand();
    createCommandMessage.setTemplateId(identifierMessage);
    createCommandMessage.setCreateArguments(recordMessage);
    const createCommandObject: CreateCommand = {
        commandType: 'create',
        templateId: identifierObject,
        arguments: recordObject
    };

    const choiceArgument = new PbValue();
    choiceArgument.setBool(true);
    const exerciseCommandMessage = new PbExerciseCommand();
    exerciseCommandMessage.setTemplateId(identifierMessage);
    exerciseCommandMessage.setContractId('contractId2');
    exerciseCommandMessage.setChoice('choice');
    exerciseCommandMessage.setChoiceArgument(choiceArgument);
    const exerciseCommandObject: ExerciseCommand = {
        commandType: 'exercise',
        templateId: identifierObject,
        contractId: 'contractId2',
        choice: 'choice',
        argument: {valueType: 'bool', bool: true}
    };

    const createAndExerciseCommandMessage = new PbCreateAndExerciseCommand();
    createAndExerciseCommandMessage.setTemplateId(identifierMessage);
    createAndExerciseCommandMessage.setCreateArguments(recordMessage);
    createAndExerciseCommandMessage.setChoice('choice');
    createAndExerciseCommandMessage.setChoiceArgument(choiceArgument);
    const createAndExerciseCommandObject: CreateAndExerciseCommand = {
        commandType: 'createAndExercise',
        templateId: identifierObject,
        createArguments: recordObject,
        choice: 'choice',
        choiceArgument: {valueType: 'bool', bool: true}
    };

    const command1 = new PbCommand();
    command1.setCreate(createCommandMessage);
    const command2 = new PbCommand();
    command2.setExercise(exerciseCommandMessage);
    const ledgerEffectiveTime = new PbTimestamp();
    ledgerEffectiveTime.setSeconds(60);
    ledgerEffectiveTime.setNanos(61);
    const maximumRecordTime = new PbTimestamp();
    maximumRecordTime.setSeconds(62);
    maximumRecordTime.setNanos(63);
    const commandsMessage = new PbCommands();
    commandsMessage.setApplicationId('applicationId');
    commandsMessage.setCommandId('commandId');
    commandsMessage.setLedgerEffectiveTime(ledgerEffectiveTime);
    commandsMessage.setMaximumRecordTime(maximumRecordTime);
    commandsMessage.setParty('Alice');
    commandsMessage.setWorkflowId('workflowId');
    commandsMessage.setCommandsList([command1, command2]);
    const commandsObject: Commands = {
        applicationId: 'applicationId',
        commandId: 'commandId',
        ledgerEffectiveTime: {seconds: 60, nanoseconds: 61},
        maximumRecordTime: {seconds: 62, nanoseconds: 63},
        party: 'Alice',
        workflowId: 'workflowId',
        list: [createCommandObject, exerciseCommandObject]
    };

    const createdEventMessage = new PbCreatedEvent();
    createdEventMessage.setEventId('eventId');
    createdEventMessage.setContractId('contractId');
    createdEventMessage.setTemplateId(identifierMessage);
    createdEventMessage.setCreateArguments(recordMessage);
    createdEventMessage.setWitnessPartiesList(['Alice', 'Bob']);
    const createdEventObject: CreatedEvent = {
        eventType: "created",
        eventId: 'eventId',
        contractId: 'contractId',
        templateId: identifierObject,
        arguments: recordObject,
        witnessParties: ['Alice', 'Bob']
    };

    const transactionTemplateId = new PbIdentifier();
    transactionTemplateId.setPackageId('pkg');
    transactionTemplateId.setModuleName('alejandro');
    transactionTemplateId.setEntityName('roberto');
    const event = new PbEvent();
    const archived = new PbArchivedEvent();
    const archivedTemplateId = new PbIdentifier();
    archivedTemplateId.setPackageId('pkg');
    archivedTemplateId.setModuleName('alejandro');
    archivedTemplateId.setEntityName('roberto');
    archived.setTemplateId(transactionTemplateId);
    archived.setContractId('some-contract-id');
    archived.setEventId('some-event-id');
    archived.setWitnessPartiesList(['pool']);
    event.setArchived(archived);

    const effectiveAt = new PbTimestamp();
    effectiveAt.setSeconds(10);
    effectiveAt.setNanos(20);
    const transactionMessage = new PbTransaction();
    transactionMessage.setEventsList([event]);
    transactionMessage.setCommandId('befehl');
    transactionMessage.setEffectiveAt(effectiveAt);
    transactionMessage.setOffset('zero');
    transactionMessage.setTransactionId('tx');
    transactionMessage.setWorkflowId('workflow');

    const transactionObject: Transaction = {
        commandId: 'befehl',
        effectiveAt: {seconds: 10, nanoseconds: 20},
        events: [
            {
                eventType: 'archived',
                contractId: 'some-contract-id',
                eventId: 'some-event-id',
                templateId: {
                    packageId: 'pkg',
                    moduleName: 'alejandro',
                    entityName: 'roberto'
                },
                witnessParties: ['pool']
            }
        ],
        offset: 'zero',
        transactionId: 'tx',
        workflowId: 'workflow'
    };

    const transactionTreeTemplateId = new PbIdentifier();
    transactionTreeTemplateId.setPackageId('pkg');
    transactionTreeTemplateId.setModuleName('alejandro');
    transactionTreeTemplateId.setEntityName('roberto');
    const transactionTreeEvent = new PbTreeEvent();
    const transactionTreeCreated = new PbCreatedEvent();
    const createdTemplateId = new PbIdentifier();
    const createdArgs = new PbRecord();
    const createdArgsField = new PbRecordField();
    const createdArgsFieldValue = new PbValue();
    createdArgsFieldValue.setContractId('boo');
    createdArgsField.setLabel('foo');
    createdArgsField.setValue(createdArgsFieldValue);
    createdArgs.setFieldsList([createdArgsField]);
    createdTemplateId.setPackageId('pkg');
    createdTemplateId.setModuleName('alejandro');
    createdTemplateId.setEntityName('roberto');
    transactionTreeCreated.setTemplateId(transactionTreeTemplateId);
    transactionTreeCreated.setContractId('some-contract-id');
    transactionTreeCreated.setEventId('some-event-id');
    transactionTreeCreated.setWitnessPartiesList(['pool']);
    transactionTreeCreated.setCreateArguments(createdArgs);
    transactionTreeEvent.setCreated(transactionTreeCreated);

    const transactionTreeEffectiveAt = new PbTimestamp();
    transactionTreeEffectiveAt.setSeconds(10);
    transactionTreeEffectiveAt.setNanos(20);
    const transactionTreeMessage = new PbTransactionTree();
    transactionTreeMessage.getEventsByIdMap().set('someId', transactionTreeEvent);
    transactionTreeMessage.addRootEventIds('root');
    transactionTreeMessage.setCommandId('befehl');
    transactionTreeMessage.setEffectiveAt(transactionTreeEffectiveAt);
    transactionTreeMessage.setOffset('zero');
    transactionTreeMessage.setTransactionId('tx');
    transactionTreeMessage.setWorkflowId('workflow');
    transactionTreeMessage.getEventsByIdMap().set('someId', transactionTreeEvent);

    const transactionTreeObject: TransactionTree = {
        commandId: 'befehl',
        effectiveAt: {seconds: 10, nanoseconds: 20},
        eventsById: {
            someId: {
                eventType: 'created',
                templateId: {
                    packageId: 'pkg',
                    moduleName: 'alejandro',
                    entityName: 'roberto'
                },
                contractId: 'some-contract-id',
                eventId: 'some-event-id',
                witnessParties: ['pool'],
                arguments: {
                    fields: {
                        foo: {valueType: 'contractId', contractId: 'boo'}
                    }
                }
            }
        },
        rootEventIds: ['root'],
        offset: 'zero',
        transactionId: 'tx',
        workflowId: 'workflow'
    };

    itShouldConvert('Identifier', () => {
        twoWayCheck(IdentifierCodec, identifierMessage, identifierObject);
    });

    itShouldConvert('InclusiveFilters', () => {
        twoWayCheck(
            InclusiveFiltersCodec,
            inclusiveFiltersMessage,
            inclusiveFiltersObject
        );
    });

    itShouldConvert('Filters', () => {
        twoWayCheck(FiltersCodec, filtersMessage, filtersObject);
    });

    itShouldConvert('TransactionsFilter', () => {
        twoWayCheck(
            TransactionFilterCodec,
            transactionFilterMessage,
            transactionFilterObject
        );
    });

    itShouldConvert('LedgerOffsetValidation.Absolute', () => {
        const absoluteObject: LedgerOffset = {offsetType: 'absolute', absolute: '20'};
        const beginObject: LedgerOffset = {offsetType: 'boundary', boundary: LedgerOffsetBoundaryValue.BEGIN};
        const endObject: LedgerOffset = {offsetType: 'boundary', boundary: LedgerOffsetBoundaryValue.END};
        const absoluteMessage = new PbLedgerOffset();
        absoluteMessage.setAbsolute('20');
        const beginMessage = new PbLedgerOffset();
        beginMessage.setBoundary(PbLedgerOffset.LedgerBoundary.LEDGER_BEGIN);
        const endMessage = new PbLedgerOffset();
        endMessage.setBoundary(PbLedgerOffset.LedgerBoundary.LEDGER_END);
        expect(LedgerOffsetCodec.serialize(absoluteObject)).to.deep.equal(
            absoluteMessage
        );
        expect(LedgerOffsetCodec.serialize(beginObject)).to.deep.equal(
            beginMessage
        );
        expect(LedgerOffsetCodec.serialize(endObject)).to.deep.equal(endMessage);
        expect(LedgerOffsetCodec.deserialize(absoluteMessage)).to.deep.equal(
            absoluteObject
        );
        expect(LedgerOffsetCodec.deserialize(beginMessage)).to.deep.equal(
            beginObject
        );
        expect(LedgerOffsetCodec.deserialize(endMessage)).to.deep.equal(endObject);
    });

    itShouldConvert('Timestamp', () => {
        const timestampMessage = new PbTimestamp();
        timestampMessage.setSeconds(20);
        timestampMessage.setNanos(21);

        const timestampObject: Timestamp = {
            seconds: 20,
            nanoseconds: 21
        };

        twoWayCheck(TimestampCodec, timestampMessage, timestampObject);
    });

    itShouldConvert('ValueValidation(Bool)', () => {
        const boolMessage = new PbValue();
        boolMessage.setBool(true);
        const boolObject: Value = {valueType: 'bool', bool: true};
        twoWayCheck(ValueCodec, boolMessage, boolObject);
    });

    itShouldConvert('ValueValidation(ContractId)', () => {
        const contractIdMessage = new PbValue();
        contractIdMessage.setContractId('contractId');
        const contractIdObject: Value = {valueType: 'contractId', contractId: 'contractId'};
        twoWayCheck(ValueCodec, contractIdMessage, contractIdObject);
    });

    itShouldConvert('ValueValidation(Date)', () => {
        const dateMessage = new PbValue();
        dateMessage.setDate(1);
        const dateObject: Value = {valueType: 'date', date: '1'};
        twoWayCheck(ValueCodec, dateMessage, dateObject);
    });

    itShouldConvert('ValueValidation(Decimal)', () => {
        const decimalMessage = new PbValue();
        decimalMessage.setDecimal('30');
        const decimalObject: Value = {valueType: 'decimal', decimal: '30'};
        twoWayCheck(ValueCodec, decimalMessage, decimalObject);
    });

    itShouldConvert('ValueValidation(Int64)', () => {
        const int64Message = new PbValue();
        int64Message.setInt64('40');
        const int64Object: Value = {valueType: 'int64', int64: '40'};
        twoWayCheck(ValueCodec, int64Message, int64Object);
    });

    itShouldConvert('ValueValidation(List)', () => {
        const emptyList = new PbList();
        emptyList.setElementsList([]);
        const emptyListMessage = new PbValue();
        emptyListMessage.setList(emptyList);
        const emptyListObject: Value = {valueType: 'list', list: []};
        twoWayCheck(ValueCodec, emptyListMessage, emptyListObject);

        const dateMessage = new PbValue();
        dateMessage.setDate(2);
        const singletonList = new PbList();
        singletonList.setElementsList([dateMessage]);
        const singletonListMessage = new PbValue();
        singletonListMessage.setList(singletonList);
        const singletonListObject: Value = {valueType: 'list', list: [{valueType: 'date', date: '2'}]};
        twoWayCheck(ValueCodec, singletonListMessage, singletonListObject);
    });

    itShouldConvert('ValueValidation(Party)', () => {
        const partyMessage = new PbValue();
        partyMessage.setParty('Alice');
        const partyObject: Value = {valueType: 'party', party: 'Alice'};
        twoWayCheck(ValueCodec, partyMessage, partyObject);
    });

    itShouldConvert('ValueValidation(RecordValidation)', () => {
        const recordValueMessage = new PbValue();
        recordValueMessage.setRecord(recordMessage);
        const recordValueObject: Value = Object.assign({valueType: 'record'}, recordObject);
        twoWayCheck(ValueCodec, recordValueMessage, recordValueObject);
    });

    itShouldConvert('ValueValidation(Text)', () => {
        const textMessage = new PbValue();
        textMessage.setText('text2');
        const textObject: Value = {valueType: 'text', text: 'text2'};
        twoWayCheck(ValueCodec, textMessage, textObject);
    });

    itShouldConvert('ValueValidation(TimestampValidation)', () => {
        const timestampMessage = new PbValue();
        timestampMessage.setTimestamp('50');
        const timestampObject: Value = {valueType: 'timestamp', timestamp: '50'};
        twoWayCheck(ValueCodec, timestampMessage, timestampObject);
    });

    itShouldConvert('ValueValidation(Unit)', () => {
        const unitMessage = new PbValue();
        unitMessage.setUnit(new PbEmpty());
        expect(unitMessage.hasUnit()).to.be.true;
        const unitObject: Value = {valueType: 'unit'};
        twoWayCheck(ValueCodec, unitMessage, unitObject);
    });

    itShouldConvert('ValueValidation(VariantValidation)', () => {
        const recordValueMessage = new PbValue();
        recordValueMessage.setRecord(recordMessage);
        const variant = new PbVariant();
        variant.setConstructor('constructor');
        variant.setVariantId(identifierMessage);
        variant.setValue(recordValueMessage);
        const variantMessage = new PbValue();
        variantMessage.setVariant(variant);
        const variantObject: Value = {
            valueType: 'variant',
            constructor: 'constructor',
            variantId: identifierObject,
            value: Object.assign({valueType: 'record'}, recordObject)
        };
        twoWayCheck(ValueCodec, variantMessage, variantObject);
    });

    itShouldConvert('Record', () => {
        twoWayCheck(RecordCodec, recordMessage, recordObject);
    });

    itShouldConvert('ArbitraryCommand.Create', () => {
        twoWayCheck(
            CreateCommandCodec,
            createCommandMessage,
            createCommandObject
        );
    });

    itShouldConvert('ArbitraryCommand.Exercise', () => {
        twoWayCheck(
            ExerciseCommandCodec,
            exerciseCommandMessage,
            exerciseCommandObject
        );
    });

    itShouldConvert('CreateAndExerciseCommand', () => {
        twoWayCheck(
            CreateAndExerciseCommandCodec,
            createAndExerciseCommandMessage,
            createAndExerciseCommandObject
        );
    });

    itShouldConvert('ArbitraryCommand', () => {
        const commandMessage = new PbCommand();
        commandMessage.setCreate(createCommandMessage);
        twoWayCheck(CommandCodec, commandMessage, createCommandObject);

        const commandMessage2 = new PbCommand();
        commandMessage2.setExercise(exerciseCommandMessage);
        twoWayCheck(CommandCodec, commandMessage2, exerciseCommandObject);
    });

    itShouldConvert('Commands', () => {
        twoWayCheck(CommandsCodec, commandsMessage, commandsObject);
    });

    itShouldConvert('SubmitRequest', () => {
        const submitRequestMessage = new PbSubmitRequest();
        submitRequestMessage.setCommands(commandsMessage);
        const submitRequestObject: SubmitRequest = {commands: commandsObject};
        twoWayCheck(
            SubmitRequestCodec,
            submitRequestMessage,
            submitRequestObject
        );
    });

    itShouldConvert('GetTransactionsRequest', () => {
        const offset = new PbLedgerOffset();
        offset.setAbsolute('70');
        const requestMessage = new PbGetTransactionsRequest();
        requestMessage.setBegin(offset);
        requestMessage.setFilter(transactionFilterMessage);
        requestMessage.setVerbose(true);
        const requestObject: GetTransactionsRequest = {
            begin: {offsetType: 'absolute', absolute: '70'},
            filter: transactionFilterObject,
            verbose: true
        };
        twoWayCheck(GetTransactionsRequestCodec, requestMessage, requestObject);
        requestMessage.setEnd(offset);
        requestObject.end = requestObject.begin;
        twoWayCheck(GetTransactionsRequestCodec, requestMessage, requestObject);
    });

    itShouldConvert('GetActiveContractsRequest', () => {
        const requestMessage = new PbGetActiveContractsRequest();
        requestMessage.setVerbose(true);
        requestMessage.setFilter(transactionFilterMessage);
        const requestObject: GetActiveContractsRequest = {
            verbose: true,
            filter: transactionFilterObject
        };
        twoWayCheck(
            GetActiveContractsRequestCodec,
            requestMessage,
            requestObject
        );
    });

    itShouldConvert('CreatedEvent', () => {
        twoWayCheck(CreatedEventCodec, createdEventMessage, createdEventObject);
    });

    itShouldConvert('GetActiveContractsResponse', () => {
        const responseMessage = new PbGetActiveContractsResponse();
        responseMessage.setOffset('7');
        responseMessage.setWorkflowId('wid');
        responseMessage.setActiveContractsList([createdEventMessage]);
        const responseObject: GetActiveContractsResponse = {
            offset: '7',
            workflowId: 'wid',
            activeContracts: [createdEventObject]
        };
        twoWayCheck(
            GetActiveContractsResponseCodec,
            responseMessage,
            responseObject
        );
    });

    itShouldConvert('GetLedgerIdentityResponse', () => {
        const responseMessage = new PbGetLedgerIdentityResponse();
        responseMessage.setLedgerId('ledgerId2');
        const responseObject: GetLedgerIdentityResponse = {
            ledgerId: 'ledgerId2'
        };
        twoWayCheck(
            GetLedgerIdentityResponseCodec,
            responseMessage,
            responseObject
        );
    });

    itShouldConvert('GetPackageResponse', () => {
        const responseMessage = new PbGetPackageResponse();
        responseMessage.setArchivePayload('cafebabe');
        responseMessage.setHash('deadbeef');
        responseMessage.setHashFunction(PbHashFunction.SHA256);
        const responseObject: GetPackageResponse = {
            archivePayload: 'cafebabe',
            hash: 'deadbeef',
            hashFunction: HashFunction.SHA256
        };
        twoWayCheck(GetPackageResponseCodec, responseMessage, responseObject);
    });

    itShouldConvert('ListPackagesResponse', () => {
        const responseMessage = new PbListPackagesResponse();
        responseMessage.setPackageIdsList(['package1', 'package2']);
        const responseObject: ListPackagesResponse = {
            packageIds: ['package1', 'package2']
        };
        twoWayCheck(ListPackagesResponseCodec, responseMessage, responseObject);
    });

    itShouldConvert('SubmitAndWaitRequest', () => {
        const submitRequestMessage = new PbSubmitAndWaitRequest();
        submitRequestMessage.setCommands(commandsMessage);
        const submitRequestObject: SubmitAndWaitRequest = {commands: commandsObject};
        twoWayCheck(
            SubmitAndWaitRequestCodec,
            submitRequestMessage,
            submitRequestObject
        );
    });

    itShouldConvert('SubmitAndWaitForTransactionResponse', () => {
        const submitAndWaitForTransactionResponseMessage = new PbSubmitAndWaitForTransactionResponse();
        submitAndWaitForTransactionResponseMessage.setTransaction(transactionMessage);
        const submitAndWaitForTransactionResponseObject: SubmitAndWaitForTransactionResponse = {
            transaction: transactionObject
        };
        twoWayCheck(
            SubmitAndWaitForTransactionResponseCodec,
            submitAndWaitForTransactionResponseMessage,
            submitAndWaitForTransactionResponseObject
        );
    });

    itShouldConvert('SubmitAndWaitForTransactionIdResponse', () => {
        const submitAndWaitForTransactionIdResponseMessage = new PbSubmitAndWaitForTransactionIdResponse();
        submitAndWaitForTransactionIdResponseMessage.setTransactionId('foobar');
        const submitAndWaitForTransactionIdResponseObject: SubmitAndWaitForTransactionIdResponse = {
            transactionId: 'foobar'
        };
        twoWayCheck(
            SubmitAndWaitForTransactionIdResponseCodec,
            submitAndWaitForTransactionIdResponseMessage,
            submitAndWaitForTransactionIdResponseObject
        );
    });

    itShouldConvert('SubmitAndWaitForTransactionTreeResponse', () => {

        // TODO: we re-create the transactionTreeMessage here as in due to an apparent misbehavior, the call to
        // TODO: setTransaction later on seem to have destructive consequences on transactionTreeMessage
        // TODO: looks like a bug on google-protobuf, probably worth investigating
        // TODO: this is not a priority as in the bindings we _NEVER_ re-use objects from ProtoBuffer
        const transactionTreeTemplateId = new PbIdentifier();
        transactionTreeTemplateId.setPackageId('pkg');
        transactionTreeTemplateId.setModuleName('alejandro');
        transactionTreeTemplateId.setEntityName('roberto');
        const transactionTreeEvent = new PbTreeEvent();
        const transactionTreeCreated = new PbCreatedEvent();
        const createdTemplateId = new PbIdentifier();
        const createdArgs = new PbRecord();
        const createdArgsField = new PbRecordField();
        const createdArgsFieldValue = new PbValue();
        createdArgsFieldValue.setContractId('boo');
        createdArgsField.setLabel('foo');
        createdArgsField.setValue(createdArgsFieldValue);
        createdArgs.setFieldsList([createdArgsField]);
        createdTemplateId.setPackageId('pkg');
        createdTemplateId.setModuleName('alejandro');
        createdTemplateId.setEntityName('roberto');
        transactionTreeCreated.setTemplateId(transactionTreeTemplateId);
        transactionTreeCreated.setContractId('some-contract-id');
        transactionTreeCreated.setEventId('some-event-id');
        transactionTreeCreated.setWitnessPartiesList(['pool']);
        transactionTreeCreated.setCreateArguments(createdArgs);
        transactionTreeEvent.setCreated(transactionTreeCreated);

        const transactionTreeEffectiveAt = new PbTimestamp();
        transactionTreeEffectiveAt.setSeconds(10);
        transactionTreeEffectiveAt.setNanos(20);
        const transactionTreeMessage1 = new PbTransactionTree();
        transactionTreeMessage1.getEventsByIdMap().set('someId', transactionTreeEvent);
        transactionTreeMessage1.addRootEventIds('root');
        transactionTreeMessage1.setCommandId('befehl');
        transactionTreeMessage1.setEffectiveAt(transactionTreeEffectiveAt);
        transactionTreeMessage1.setOffset('zero');
        transactionTreeMessage1.setTransactionId('tx');
        transactionTreeMessage1.setWorkflowId('workflow');
        transactionTreeMessage1.getEventsByIdMap().set('someId', transactionTreeEvent);

        const submitAndWaitForTransactionTreeResponseMessage = new PbSubmitAndWaitForTransactionTreeResponse();
        submitAndWaitForTransactionTreeResponseMessage.setTransaction(transactionTreeMessage1);
        const submitAndWaitForTransactionTreeResponseObject: SubmitAndWaitForTransactionTreeResponse = {
            transaction: transactionTreeObject
        };
        twoWayCheck(
            SubmitAndWaitForTransactionTreeResponseCodec,
            submitAndWaitForTransactionTreeResponseMessage,
            submitAndWaitForTransactionTreeResponseObject
        );
    });

    itShouldConvert('CompletionEndResponse', () => {
        const message = new PbCompletionEndResponse();
        const offset = new PbLedgerOffset();
        offset.setAbsolute('20');
        message.setOffset(offset);
        const object: CompletionEndResponse = {offset: {offsetType: 'absolute', absolute: '20'}};
        twoWayCheck(CompletionEndResponseCodec, message, object);
    });

    itShouldConvert('CompletionStreamRequest', () => {
        const message = new PbCompletionStreamRequest();
        const offset = new PbLedgerOffset();
        offset.setAbsolute('20');
        message.setApplicationId('space-invaders-on-the-blockchain');
        message.setOffset(offset);
        message.setPartiesList(['pool', 'birthday']);
        const object: CompletionStreamRequest = {
            applicationId: 'space-invaders-on-the-blockchain',
            offset: {offsetType: 'absolute', absolute: '20'},
            parties: ['pool', 'birthday']
        };
        twoWayCheck(CompletionStreamRequestCodec, message, object);
    });

    itShouldConvert('ArbitraryCheckpoint', () => {
        const message = new PbCheckpoint();
        const offset = new PbLedgerOffset();
        offset.setAbsolute('20');
        message.setOffset(offset);
        const recordTime = new PbTimestamp();
        recordTime.setSeconds(42);
        recordTime.setNanos(999);
        message.setRecordTime(recordTime);
        const object: Checkpoint = {
            offset: {offsetType: 'absolute', absolute: '20'},
            recordTime: {seconds: 42, nanoseconds: 999}
        };
        twoWayCheck(CheckpointCodec, message, object);
    });

    itShouldConvert('Any', () => {
        const message = new PbAny();
        message.setValue('deadbeef');
        message.setTypeUrl('some-url');
        const object: Any = {
            value: 'deadbeef',
            typeUrl: 'some-url'
        };
        twoWayCheck(AnyCodec, message, object);
    });

    itShouldConvert('Status', () => {
        const message = new PbStatus();
        message.setCode(42);
        message.setMessage('we come in peace');
        const any1 = new PbAny();
        any1.setValue('deadbeef');
        any1.setTypeUrl('some-url');
        const any2 = new PbAny();
        any2.setValue('cafebabe');
        any2.setTypeUrl('some-other-url');
        message.setDetailsList([any1, any2]);
        const object: Status = {
            code: 42,
            message: 'we come in peace',
            details: [
                {
                    value: 'deadbeef',
                    typeUrl: 'some-url'
                },
                {
                    value: 'cafebabe',
                    typeUrl: 'some-other-url'
                }
            ]
        };
        twoWayCheck(StatusCodec, message, object);
    });

    itShouldConvert('Completion', () => {
        const message = new PbCompletion();
        message.setCommandId('befehl');

        const status = new PbStatus();
        status.setCode(42);
        status.setMessage('we come in peace');
        const any1 = new PbAny();
        any1.setValue('deadbeef');
        any1.setTypeUrl('some-url');
        const any2 = new PbAny();
        any2.setValue('cafebabe');
        any2.setTypeUrl('some-other-url');
        status.setDetailsList([any1, any2]);

        message.setStatus(status);

        const object: Completion = {
            commandId: 'befehl',
            status: {
                code: 42,
                message: 'we come in peace',
                details: [
                    {
                        value: 'deadbeef',
                        typeUrl: 'some-url'
                    },
                    {
                        value: 'cafebabe',
                        typeUrl: 'some-other-url'
                    }
                ]
            }
        };

        twoWayCheck(CompletionCodec, message, object);
    });

    itShouldConvert('CompletionStreamResponse', () => {
        const message = new PbCompletionStreamResponse();

        const checkpoint = new PbCheckpoint();
        const offset = new PbLedgerOffset();
        offset.setAbsolute('20');
        checkpoint.setOffset(offset);
        const recordTime = new PbTimestamp();
        recordTime.setSeconds(42);
        recordTime.setNanos(999);
        checkpoint.setRecordTime(recordTime);

        message.setCheckpoint(checkpoint);

        const completion1 = new PbCompletion();
        completion1.setCommandId('befehl1');

        const status1 = new PbStatus();
        status1.setCode(42);
        status1.setMessage('we come in peace1');
        const any11 = new PbAny();
        any11.setValue('deadbeef');
        any11.setTypeUrl('some-url');
        const any12 = new PbAny();
        any12.setValue('cafebabe');
        any12.setTypeUrl('some-other-url');
        status1.setDetailsList([any11, any12]);

        completion1.setStatus(status1);

        const completion2 = new PbCompletion();
        completion2.setCommandId('befehl2');

        const status2 = new PbStatus();
        status2.setCode(47);
        status2.setMessage('we come in peace2');
        const any21 = new PbAny();
        any21.setValue('deadcafe');
        any21.setTypeUrl('some-url');
        const any22 = new PbAny();
        any22.setValue('cafebeef');
        any22.setTypeUrl('some-other-url');
        status2.setDetailsList([any21, any22]);

        completion2.setStatus(status2);

        message.setCompletionsList([completion1, completion2]);

        const object: CompletionStreamResponse = {
            checkpoint: {
                offset: {offsetType: 'absolute', absolute: '20'},
                recordTime: {seconds: 42, nanoseconds: 999}
            },
            completions: [
                {
                    commandId: 'befehl1',
                    status: {
                        code: 42,
                        message: 'we come in peace1',
                        details: [
                            {
                                value: 'deadbeef',
                                typeUrl: 'some-url'
                            },
                            {
                                value: 'cafebabe',
                                typeUrl: 'some-other-url'
                            }
                        ]
                    }
                },
                {
                    commandId: 'befehl2',
                    status: {
                        code: 47,
                        message: 'we come in peace2',
                        details: [
                            {
                                value: 'deadcafe',
                                typeUrl: 'some-url'
                            },
                            {
                                value: 'cafebeef',
                                typeUrl: 'some-other-url'
                            }
                        ]
                    }
                }
            ]
        };

        twoWayCheck(CompletionStreamResponseCodec, message, object);
    });

    itShouldConvert('Duration', () => {
        const message = new PbDuration();
        message.setSeconds(20);
        message.setNanos(21);

        const object: Duration = {
            seconds: 20,
            nanoseconds: 21
        };

        twoWayCheck(DurationCodec, message, object);
    });

    itShouldConvert('LedgerConfiguration', () => {
        const maxTtl = new PbDuration();
        maxTtl.setSeconds(20);
        maxTtl.setNanos(21);

        const minTtl = new PbDuration();
        minTtl.setSeconds(22);
        minTtl.setNanos(23);

        const message = new PbLedgerConfiguration();
        message.setMaxTtl(maxTtl);
        message.setMinTtl(minTtl);

        const object: LedgerConfiguration = {
            maxTtl: {
                seconds: 20,
                nanoseconds: 21
            },
            minTtl: {
                seconds: 22,
                nanoseconds: 23
            }
        };

        twoWayCheck(LedgerConfigurationCodec, message, object);
    });

    itShouldConvert('GetLedgerConfigurationResponse', () => {
        const maxTtl = new PbDuration();
        maxTtl.setSeconds(20);
        maxTtl.setNanos(21);

        const minTtl = new PbDuration();
        minTtl.setSeconds(22);
        minTtl.setNanos(23);

        const ledgerConfiguration = new PbLedgerConfiguration();
        ledgerConfiguration.setMaxTtl(maxTtl);
        ledgerConfiguration.setMinTtl(minTtl);

        const message = new PbGetLedgerConfigurationResponse();
        message.setLedgerConfiguration(ledgerConfiguration);

        const object: GetLedgerConfigurationResponse = {
            config: {
                maxTtl: {
                    seconds: 20,
                    nanoseconds: 21
                },
                minTtl: {
                    seconds: 22,
                    nanoseconds: 23
                }
            }
        };
        twoWayCheck(GetLedgerConfigurationResponseCodec, message, object);
    });

    itShouldConvert('GetLedgerEndResponse', () => {
        const message = new PbGetLedgerEndResponse();
        const offset = new PbLedgerOffset();
        offset.setAbsolute('47');
        message.setOffset(offset);
        const object: GetLedgerEndResponse = {
            offset: {
                offsetType: 'absolute',
                absolute: '47'
            }
        };
        twoWayCheck(GetLedgerEndResponseCodec, message, object);
    });

    itShouldConvert('GetTransactionByEventIdRequest', () => {
        const message = new PbGetTransactionByEventIdRequest();
        message.setEventId('some-id');
        message.setRequestingPartiesList(['birthday', 'pool', 'house-warming']);
        const object: GetTransactionByEventIdRequest = {
            eventId: 'some-id',
            requestingParties: ['birthday', 'pool', 'house-warming']
        };
        twoWayCheck(GetTransactionByEventIdRequestCodec, message, object);
    });

    itShouldConvert('GetTransactionByIdRequest', () => {
        const message = new PbGetTransactionByIdRequest();
        message.setTransactionId('some-id');
        message.setRequestingPartiesList(['birthday', 'pool', 'house-warming']);
        const object: GetTransactionByIdRequest = {
            transactionId: 'some-id',
            requestingParties: ['birthday', 'pool', 'house-warming']
        };
        twoWayCheck(GetTransactionByIdRequestCodec, message, object);
    });

    itShouldConvert('ArchivedEvent', () => {
        const message = new PbArchivedEvent();
        const templateId = new PbIdentifier();
        templateId.setPackageId('pkg');
        templateId.setModuleName('alejandro');
        templateId.setEntityName('roberto');
        message.setTemplateId(templateId);
        message.setContractId('some-contract-id');
        message.setEventId('some-event-id');
        message.setWitnessPartiesList(['birthday', 'pool', 'house-warming']);
        const object: ArchivedEvent = {
            eventType: 'archived',
            contractId: 'some-contract-id',
            eventId: 'some-event-id',
            templateId: {
                packageId: 'pkg',
                moduleName: 'alejandro',
                entityName: 'roberto'
            },
            witnessParties: ['birthday', 'pool', 'house-warming']
        };
        twoWayCheck(ArchivedEventCodec, message, object);
    });

    itShouldConvert('ExercisedEvent', () => {
        const message = new PbExercisedEvent();
        const templateId = new PbIdentifier();
        templateId.setPackageId('pkg');
        templateId.setModuleName('alejandro');
        templateId.setEntityName('roberto');
        message.setTemplateId(templateId);
        message.setContractId('some-contract-id');
        message.setEventId('some-event-id');
        message.setActingPartiesList(['birthday']);
        message.setWitnessPartiesList(['house-warming']);
        const argument = new PbValue();
        const list = new PbList();
        const party = new PbValue();
        party.setParty('patricians');
        list.setElementsList([party]);
        argument.setList(list);
        message.setChoiceArgument(argument);
        message.setChoice('freedom');
        message.setConsuming(true);
        message.setContractCreatingEventId('father');
        message.setChildEventIdsList(['event']);

        const object: ExercisedEvent = {
            eventType: 'exercised',
            contractId: 'some-contract-id',
            eventId: 'some-event-id',
            templateId: {
                packageId: 'pkg',
                moduleName: 'alejandro',
                entityName: 'roberto'
            },
            actingParties: ['birthday'],
            argument: {valueType: 'list', list: [{valueType: 'party', party: 'patricians'}]},
            childEventIds: ['event'],
            choice: 'freedom',
            consuming: true,
            contractCreatingEventId: 'father',
            witnessParties: ['house-warming']
        };

        twoWayCheck(ExercisedEventCodec, message, object);

        const result = new PbValue();
        result.setBool(true);
        message.setExerciseResult(result);

        twoWayCheck(ExercisedEventCodec, message, Object.assign(object, { exerciseResult: { valueType: 'bool', bool: true } }));

    });

    itShouldConvert('Event', () => {
        const templateId = new PbIdentifier();
        templateId.setPackageId('pkg');
        templateId.setModuleName('alejandro');
        templateId.setEntityName('roberto');
        const event = new PbEvent();
        const archived = new PbArchivedEvent();
        const archivedTemplateId = new PbIdentifier();
        archivedTemplateId.setPackageId('pkg');
        archivedTemplateId.setModuleName('alejandro');
        archivedTemplateId.setEntityName('roberto');
        archived.setTemplateId(templateId);
        archived.setContractId('some-contract-id');
        archived.setEventId('some-event-id');
        archived.setWitnessPartiesList(['pool']);
        event.setArchived(archived);

        const object: Event = {
            eventType: 'archived',
            contractId: 'some-contract-id',
            eventId: 'some-event-id',
            templateId: {
                packageId: 'pkg',
                moduleName: 'alejandro',
                entityName: 'roberto'
            },
            witnessParties: ['pool']
        };

        twoWayCheck(EventCodec, event, object);
    });

    itShouldConvert('TransactionTree', () => {
        twoWayCheck(TransactionTreeCodec, transactionTreeMessage, transactionTreeObject);
    });

    itShouldConvert('GetTransactionResponse', () => {
        const message = new PbGetTransactionResponse();
        message.setTransaction(transactionTreeMessage);

        const object: GetTransactionResponse = {
            transaction: transactionTreeObject
        };

        twoWayCheck(GetTransactionResponseCodec, message, object);
    });

    itShouldConvert('Transaction', () => {
        twoWayCheck(TransactionCodec, transactionMessage, transactionObject);
    });

    itShouldConvert('GetTransactionsResponse', () => {
        const templateId = new PbIdentifier();
        templateId.setPackageId('pkg');
        templateId.setModuleName('alejandro');
        templateId.setEntityName('roberto');
        const event = new PbEvent();
        const archived = new PbArchivedEvent();
        const archivedTemplateId = new PbIdentifier();
        archivedTemplateId.setPackageId('pkg');
        archivedTemplateId.setModuleName('alejandro');
        archivedTemplateId.setEntityName('roberto');
        archived.setTemplateId(templateId);
        archived.setContractId('some-contract-id');
        archived.setEventId('some-event-id');
        archived.setWitnessPartiesList(['pool']);
        event.setArchived(archived);

        const effectiveAt = new PbTimestamp();
        effectiveAt.setSeconds(10);
        effectiveAt.setNanos(20);
        const transaction = new PbTransaction();
        transaction.setEventsList([event]);
        transaction.setCommandId('befehl');
        transaction.setEffectiveAt(effectiveAt);
        transaction.setOffset('zero');
        transaction.setTransactionId('tx');
        transaction.setWorkflowId('workflow');

        const message = new PbGetTransactionsResponse();
        message.setTransactionsList([transaction]);

        const object: GetTransactionsResponse = {
            transactions: [
                {
                    commandId: 'befehl',
                    effectiveAt: {seconds: 10, nanoseconds: 20},
                    events: [
                        {
                            eventType: 'archived',
                            contractId: 'some-contract-id',
                            eventId: 'some-event-id',
                            templateId: {
                                packageId: 'pkg',
                                moduleName: 'alejandro',
                                entityName: 'roberto'
                            },
                            witnessParties: ['pool']
                        }
                    ],
                    offset: 'zero',
                    transactionId: 'tx',
                    workflowId: 'workflow'
                }
            ]
        };

        twoWayCheck(GetTransactionsResponseCodec, message, object);
    });

    itShouldConvert('GetTransactionTreesResponse', () => {
        const templateId = new PbIdentifier();
        templateId.setPackageId('pkg');
        templateId.setModuleName('alejandro');
        templateId.setEntityName('roberto');
        const event = new PbTreeEvent();
        const created = new PbCreatedEvent();
        const createdTemplateId = new PbIdentifier();
        const createdArgs = new PbRecord();
        const createdArgsField = new PbRecordField();
        const createdArgsFieldValue = new PbValue();
        createdArgsFieldValue.setContractId('boo');
        createdArgsField.setLabel('foo');
        createdArgsField.setValue(createdArgsFieldValue);
        createdArgs.setFieldsList([createdArgsField]);
        createdTemplateId.setPackageId('pkg');
        createdTemplateId.setModuleName('alejandro');
        createdTemplateId.setEntityName('roberto');
        created.setTemplateId(templateId);
        created.setContractId('some-contract-id');
        created.setEventId('some-event-id');
        created.setWitnessPartiesList(['pool']);
        created.setCreateArguments(createdArgs);
        event.setCreated(created);

        const effectiveAt = new PbTimestamp();
        effectiveAt.setSeconds(10);
        effectiveAt.setNanos(20);
        const transaction = new PbTransactionTree();
        transaction.getEventsByIdMap().set('someId', event);
        transaction.addRootEventIds('root');
        transaction.setCommandId('befehl');
        transaction.setEffectiveAt(effectiveAt);
        transaction.setOffset('zero');
        transaction.setTransactionId('tx');
        transaction.setWorkflowId('workflow');
        transaction.getEventsByIdMap().set('someId', event);

        const message = new PbGetTransactionTreesResponse();
        message.setTransactionsList([transaction]);

        const object: GetTransactionTreesResponse = {
            transactions: [
                {
                    commandId: 'befehl',
                    effectiveAt: {seconds: 10, nanoseconds: 20},
                    eventsById: {
                        someId: {
                            eventType: 'created',
                            templateId: {
                                packageId: 'pkg',
                                moduleName: 'alejandro',
                                entityName: 'roberto'
                            },
                            contractId: 'some-contract-id',
                            eventId: 'some-event-id',
                            witnessParties: ['pool'],
                            arguments: {
                                fields: {
                                    foo: {valueType: 'contractId', contractId: 'boo'}
                                }
                            }
                        }
                    },
                    rootEventIds: ['root'],
                    offset: 'zero',
                    transactionId: 'tx',
                    workflowId: 'workflow'
                }
            ]
        };

        twoWayCheck(GetTransactionTreesResponseCodec, message, object);
    });

    itShouldConvert('GetTimeResponse', () => {
        const timestamp = new PbTimestamp();
        timestamp.setSeconds(20);
        timestamp.setNanos(21);

        const message = new PbGetTimeResponse();
        message.setCurrentTime(timestamp);

        const object: GetTimeResponse = {
            currentTime: {
                seconds: 20,
                nanoseconds: 21
            }
        };

        twoWayCheck(GetTimeResponseCodec, message, object);
    });

    itShouldConvert('SetTimeRequest', () => {
        const currentTime = new PbTimestamp();
        currentTime.setSeconds(20);
        currentTime.setNanos(21);

        const newTime = new PbTimestamp();
        newTime.setSeconds(42);
        newTime.setNanos(47);

        const message = new PbSetTimeRequest();
        message.setCurrentTime(currentTime);
        message.setNewTime(newTime);

        const object: SetTimeRequest = {
            currentTime: {
                seconds: 20,
                nanoseconds: 21
            },
            newTime: {
                seconds: 42,
                nanoseconds: 47
            }
        };

        twoWayCheck(SetTimeRequestCodec, message, object);
    });

    itShouldConvert('PartyDetailsCodec', ()=> {
        const message = new PbPartyDetails();
        message.setParty("party");
        message.setDisplayName("displayName");
        message.setIsLocal(false);
        const object: PartyDetails = {
            party: "party",
            displayName: "displayName",
            isLocal: false
        };
        twoWayCheck(PartyDetailsCodec, message, object);

    });

    itShouldConvert('ListKnownPartiesResponse', () => {
        const message = new PbListKnownPartiesResponse();
        const partyDetails = new PbPartyDetails();
        partyDetails.setParty("party");
        partyDetails.setDisplayName("displayName");
        partyDetails.setIsLocal(false);
        message.setPartyDetailsList([partyDetails]);
        const object: ListKnownPartiesResponse = {
            partyDetails: [{
                party: "party",
                displayName: "displayName",
                isLocal: false
            }]
        };
        twoWayCheck(ListKnownPartiesResponseCodec, message, object);
    });

    itShouldConvert('AllocatePartyRequest', () => {
        const message = new PbAllocatePartyRequest();
        message.setPartyIdHint("alice");
        message.setDisplayName("Alice Robertson");
        const object: AllocatePartyRequest = {
            partyIdHint: "alice",
            displayName: "Alice Robertson"
        };
        twoWayCheck(AllocatePartyRequestCodec, message, object);
    });

    itShouldConvert('AllocatePartyResponse', () => {
        const message = new PbAllocatePartyResponse();
        const partyDetails = new PbPartyDetails();
        partyDetails.setParty("party");
        partyDetails.setDisplayName("displayName");
        partyDetails.setIsLocal(false);
        message.setPartyDetails(partyDetails);
        const object: AllocatePartyResponse = {
            partyDetails: {
                party: "party",
                displayName: "displayName",
                isLocal: false
            }
        };
        twoWayCheck(AllocatePartyResponseCodec, message, object);
    });
});

function itShouldConvert(typeName: String, fn?: Mocha.Func): Mocha.Test {
    return it(`should convert model.${typeName} to/from Pb${typeName}`, fn);
}

function twoWayCheck<M, O>(codec: Codec<M, O>, m: M, o: O): void {
    expect(codec.deserialize(m)).to.deep.equal(o);
    expect(codec.serialize(o)).to.deep.equal(m);
}
