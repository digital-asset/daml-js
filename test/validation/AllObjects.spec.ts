// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as jsc from 'jsverify';

import {containsError, pickFrom} from '.';
import {isValid, ObjectValidation} from "../../src/validation/Validation";
import {ArbitraryAny} from "../arbitrary/ArbitraryAny";
import {ArbitraryCheckpoint} from "../arbitrary/ArbitraryCheckpoint";
import {ArbitraryCommands} from "../arbitrary/ArbitraryCommands";
import {ArbitraryCompletion} from "../arbitrary/ArbitraryCompletion";
import {ArbitraryArchivedEvent, ArbitraryCreatedEvent, ArbitraryExercisedEvent} from "../arbitrary/ArbitraryEvent";
import {ArbitraryCompletionEndResponse} from "../arbitrary/ArbitraryCompletionEndResponse";
import {ArbitraryCompletionStreamRequest} from "../arbitrary/ArbitraryCompletionStreamRequest";
import {ArbitraryCompletionStreamResponse} from "../arbitrary/ArbitraryCompletionStreamResponse";
import {ArbitraryCreateCommand} from "../arbitrary/ArbitraryCreateCommand";
import {ArbitraryDuration} from "../arbitrary/ArbitraryDuration";
import {ArbitraryExerciseCommand} from "../arbitrary/ArbitraryExerciseCommand";
import {ArbitraryFilters} from "../arbitrary/ArbitraryFilters";
import {ArbitraryGetActiveContractsRequest} from "../arbitrary/ArbitraryGetActiveContractsRequest";
import {ArbitraryGetLedgerEndResponse} from "../arbitrary/ArbitraryGetLedgerEndResponse";
import {ArbitraryGetLedgerIdentityResponse} from "../arbitrary/ArbitraryGetLedgerIdentityResponse";
import {ArbitraryGetPackageResponse} from "../arbitrary/ArbitraryGetPackageResponse";
import {ArbitraryGetTimeResponse} from "../arbitrary/ArbitraryGetTimeResponse";
import {ArbitraryGetTransactionByIdRequest} from "../arbitrary/ArbitraryGetTransactionByIdRequest";
import {ArbitraryGetPackageStatusResponse} from "../arbitrary/ArbitraryGetPackageStatusResponse";
import {ArbitraryGetTransactionResponse} from "../arbitrary/ArbitraryGetTransactionResponse";
import {ArbitraryGetTransactionsRequest} from "../arbitrary/ArbitraryGetTransactionsRequest";
import {ArbitraryGetTransactionsResponse} from "../arbitrary/ArbitraryGetTransactionsResponse";
import {ArbitraryIdentifier} from "../arbitrary/ArbitraryIdentifier";
import {ArbitraryInclusiveFilters} from "../arbitrary/ArbitraryInclusiveFilters";
import {ArbitraryLedgerConfiguration} from "../arbitrary/ArbitraryLedgerConfiguration";
import {ArbitraryListPackagesResponse} from "../arbitrary/ArbitraryListPackagesResponse";
import {ArbitraryStatus} from "../arbitrary/ArbitraryStatus";
import {ArbitrarySubmitRequest} from "../arbitrary/ArbitrarySubmitRequest";
import {ArbitrarySetTimeRequest} from "../arbitrary/ArbitrarySetTimeRequest";
import {ArbitraryRecord, ArbitraryVariant} from "../arbitrary/ArbitraryRecordValueVariant";
import {ArbitrarySubmitAndWaitRequest} from "../arbitrary/ArbitrarySubmitAndWaitRequest";
import {ArbitraryTimestamp} from "../arbitrary/ArbitraryTimestamp";
import {ArbitraryTransactionFilter} from "../arbitrary/ArbitraryTransactionFilter";
import {ArbitraryTransaction} from "../arbitrary/ArbitraryTransaction";
import {ArbitraryTransactionTree} from "../arbitrary/ArbitraryTransactionTree";
import {ArbitraryGetActiveContractsResponse} from "../arbitrary/ArbitraryGetActiveContractsResponse";
import {ArbitraryGetLedgerConfigurationResponse} from "../arbitrary/ArbitraryGetLedgerConfigurationResponse";
import {ArbitraryGetTransactionByEventIdRequest} from "../arbitrary/ArbitraryGetTransactionByEventIdRequest";
import {ArbitraryGetTransactionTreesResponse} from "../arbitrary/ArbitraryGetTransactionTreesResponse";
import {GetTransactionsRequestValidation} from "../../src/validation/GetTransactionsRequestValidation";
import {GetTransactionsResponseValidation} from "../../src/validation/GetTransactionsResponseValidation";
import {GetTransactionTreesResponseValidation} from "../../src/validation/GetTransactionTreesResponseValidation";
import {GetTransactionResponseValidation} from "../../src/validation/GetTransactionResponseValidation";
import {GetTransactionByIdRequestValidation} from "../../src/validation/GetTransactionByIdRequestValidation";
import {GetTransactionByEventIdRequestValidation} from "../../src/validation/GetTransactionByEventIdRequestValidation";
import {IdentifierValidation} from "../../src/validation/IdentifierValidation";
import {InclusiveFiltersValidation} from "../../src/validation/InclusiveFiltersValidation";
import {LedgerConfigurationValidation} from "../../src/validation/LedgerConfigurationValidation";
import {ListPackagesResponseValidation} from "../../src/validation/ListPackagesResponseValidation";
import {RecordValidation} from "../../src/validation/RecordValidation";
import {SetTimeRequestValidation} from "../../src/validation/SetTimeRequestValidation";
import {StatusValidation} from "../../src/validation/StatusValidation";
import {SubmitRequestValidation} from "../../src/validation/SubmitRequestValidation";
import {SubmitAndWaitRequestValidation} from "../../src/validation/SubmitAndWaitRequestValidation";
import {TimestampValidation} from "../../src/validation/TimestampValidation";
import {TransactionFilterValidation} from "../../src/validation/TransactionFilterValidation";
import {TransactionValidation} from "../../src/validation/TransactionValidation";
import {TransactionTreeValidation} from "../../src/validation/TransactionTreeValidation";
import {VariantValidation} from "../../src/validation/VariantValidation";
import {CommandsValidation} from "../../src/validation/CommandsValidation";
import {CompletionEndResponseValidation} from "../../src/validation/CompletionEndResponseValidation";
import {CompletionValidation} from "../../src/validation/CompletionValidation";
import {CheckpointValidation} from "../../src/validation/CheckPointValidation";
import {ArchivedEventValidation} from "../../src/validation/ArchivedEventValidation";
import {AnyValidation} from "../../src/validation/AnyValidation";
import {CompletionStreamRequestValidation} from "../../src/validation/CompletionStreamRequestValidation";
import {CompletionStreamResponseValidation} from "../../src/validation/CompletionStreamResponseValidation";
import {CreateCommandValidation} from "../../src/validation/CreateCommandValidation";
import {CreatedEventValidation} from "../../src/validation/CreatedEventValidation";
import {DurationValidation} from "../../src/validation/DurationValidation";
import {ExercisedEventValidation} from "../../src/validation/ExercisedEventValidation";
import {ExerciseCommandValidation} from "../../src/validation/ExerciseCommandValidation";
import {FiltersValidation} from "../../src/validation/FiltersValidation";
import {GetActiveContractsRequestValidation} from "../../src/validation/GetActiveContractsRequestValidation";
import {GetActiveContractsResponseValidation} from "../../src/validation/GetActiveContractsResponseValidation";
import {GetLedgerConfigurationResponseValidation} from "../../src/validation/GetLedgerConfigurationResponseValidation";
import {GetLedgerEndResponseValidation} from "../../src/validation/GetLedgerEndResponseValidation";
import {GetLedgerIdentityResponseValidation} from "../../src/validation/GetLedgerIdentityResponseValidation";
import {GetPackageResponseValidation} from "../../src/validation/GetPackageResponseValidation";
import {GetPackageStatusResponseValidation} from "../../src/validation/GetPackageStatusResponseValidation";
import {GetTimeResponseValidation} from "../../src/validation/GetTimeResponseValidation";
import {ArbitraryCreateAndExerciseCommand} from "../arbitrary/ArbitraryCreateAndExerciseCommand";
import {CreateAndExerciseCommandValidation} from "../../src/validation/CreateAndExerciseCommandValidation";
import {GetFlatTransactionResponseValidation} from "../../src/validation/GetFlatTransactionResponseValidation";
import {ArbitraryGetFlatTransactionResponse} from "../arbitrary/ArbitraryGetFlatTransactionResponse";
import {ArbitrarySubmitAndWaitForTransactionIdResponse} from "../arbitrary/ArbitrarySubmitAndWaitForTransactionIdResponse";
import {SubmitAndWaitForTransactionResponseValidation} from "../../src/validation/SubmitAndWaitForTransactionResponseValidation";
import {SubmitAndWaitForTransactionIdResponseValidation} from "../../src/validation/SubmitAndWaitForTransactionIdResponseValidation";
import {SubmitAndWaitForTransactionTreeResponseValidation} from "../../src/validation/SubmitAndWaitForTransactionTreeResponseValidation";
import {ArbitrarySubmitAndWaitForTransactionResponse} from "../arbitrary/ArbitrarySubmitAndWaitForTransactionResponse";
import {ArbitrarySubmitAndWaitForTransactionTreeResponse} from "../arbitrary/ArbitrarySubmitAndWaitForTransactionTreeResponse";
import {ArbitraryAllocatePartyRequest} from "../arbitrary/ArbitraryAllocatePartyRequest";
import {AllocatePartyRequestValidation} from "../../src/validation/AllocatePartyRequestValidation";

function test<A extends { [_: string]: any }>(
    validation: ObjectValidation<A>,
    arbitrary: jsc.Arbitrary<A>
): void {
    describe(`Validation: ${validation.type}`, () => {
        const required = validation.required();
        const optional = validation.optional();
        const requiredKeys = Object.keys(required);
        const optionalKeys = Object.keys(optional);
        const validations = Object.assign({}, required, optional);
        const keys = Object.keys(validations);
        if (validation.type !== 'null') {
            jsc.property('not validate a null', () => {
                return !isValid(validation.validate(null));
            });
            jsc.property('signal a type error on a null', () => {
                return containsError(validation.validate(null).errors, {
                    errorType: 'type-error',
                    expectedType: validation.type,
                    actualType: 'null'
                });
            });
        }
        jsc.property('validate well-formed objects', arbitrary, value => {
            return isValid(validation.validate(value));
        });
        if (requiredKeys.length > 0) {
            jsc.property(
                'not validate objects without a required key',
                arbitrary,
                value => {
                    delete value[pickFrom(requiredKeys)];
                    return !isValid(validation.validate(value));
                }
            );
            jsc.property(
                'signal a missing key error on objects without a required key',
                arbitrary,
                value => {
                    const removedKey = pickFrom(requiredKeys);
                    const removedKeyType = (<any>required)[removedKey].type;
                    delete value[removedKey];
                    return containsError(validation.validate(value).errors, {
                        errorType: 'missing-key',
                        expectedKey: removedKey,
                        expectedType: removedKeyType
                    });
                }
            );
        }
        if (optionalKeys.length > 0) {
            jsc.property(
                'still validate objects without an optional key',
                arbitrary,
                value => {
                    delete value[pickFrom(optionalKeys)];
                    return isValid(validation.validate(value));
                }
            );
        }
        if (keys.length > 0) {
            jsc.property(
                'not validate object with a nulled out property',
                arbitrary,
                value => {
                    const key = pickFrom(keys);
                    value[key] = null;
                    return !isValid(validation.validate(value));
                }
            );
            jsc.property(
                'signal a type error on object with a nulled out property',
                arbitrary,
                value => {
                    const key = pickFrom(keys);
                    value[key] = null;
                    const children = validation.validate(value).children;
                    return Object.keys(children).some(key =>
                        containsError(children[key].errors, {
                            errorType: 'type-error',
                            expectedType: (<any>validations)[key].type,
                            actualType: 'null'
                        })
                    );
                }
            );
        }
        jsc.property('not validate objects with an extra key', arbitrary, value => {
            const extraKey = 'supercalifragilisticexpialidocious'; // reasonably no one will ever use this as a key
            value[extraKey] = null;
            return !isValid(validation.validate(value));
        });
        jsc.property(
            'signal an unexpected key error on objects with an extra key',
            arbitrary,
            value => {
                const extraKey = 'supercalifragilisticexpialidocious'; // reasonably no one will ever use this as a key
                value[extraKey] = null;
                return containsError(validation.validate(value).errors, {
                    errorType: 'unexpected-key',
                    key: extraKey
                });
            }
        );
    });
}

test(AnyValidation, ArbitraryAny);
test(AllocatePartyRequestValidation, ArbitraryAllocatePartyRequest);
test(ArchivedEventValidation, ArbitraryArchivedEvent);
test(CheckpointValidation, ArbitraryCheckpoint);
test(CommandsValidation, ArbitraryCommands);
test(CompletionValidation, ArbitraryCompletion);
test(CompletionEndResponseValidation, ArbitraryCompletionEndResponse);
test(CompletionStreamRequestValidation, ArbitraryCompletionStreamRequest);
test(CompletionStreamResponseValidation, ArbitraryCompletionStreamResponse);
test(CreateCommandValidation, ArbitraryCreateCommand);
test(CreatedEventValidation, ArbitraryCreatedEvent);
test(CreateAndExerciseCommandValidation, ArbitraryCreateAndExerciseCommand);
test(DurationValidation, ArbitraryDuration);
test(ExercisedEventValidation, ArbitraryExercisedEvent);
test(ExerciseCommandValidation, ArbitraryExerciseCommand);
test(FiltersValidation, ArbitraryFilters);
test(GetActiveContractsRequestValidation, ArbitraryGetActiveContractsRequest);
test(
    GetActiveContractsResponseValidation,
    ArbitraryGetActiveContractsResponse
);
test(
    GetLedgerConfigurationResponseValidation,
    ArbitraryGetLedgerConfigurationResponse
);
test(GetLedgerEndResponseValidation, ArbitraryGetLedgerEndResponse);
test(GetLedgerIdentityResponseValidation, ArbitraryGetLedgerIdentityResponse);
test(GetPackageResponseValidation, ArbitraryGetPackageResponse);
test(GetPackageStatusResponseValidation, ArbitraryGetPackageStatusResponse);
test(GetTimeResponseValidation, ArbitraryGetTimeResponse);
test(
    GetTransactionByEventIdRequestValidation,
    ArbitraryGetTransactionByEventIdRequest
);
test(GetTransactionByIdRequestValidation, ArbitraryGetTransactionByIdRequest);
test(GetFlatTransactionResponseValidation, ArbitraryGetFlatTransactionResponse);
test(GetTransactionResponseValidation, ArbitraryGetTransactionResponse);
test(GetTransactionsRequestValidation, ArbitraryGetTransactionsRequest);
test(GetTransactionsResponseValidation, ArbitraryGetTransactionsResponse);
test(
    GetTransactionTreesResponseValidation,
    ArbitraryGetTransactionTreesResponse
);
test(IdentifierValidation, ArbitraryIdentifier);
test(InclusiveFiltersValidation, ArbitraryInclusiveFilters);
test(LedgerConfigurationValidation, ArbitraryLedgerConfiguration);
test(ListPackagesResponseValidation, ArbitraryListPackagesResponse);
test(RecordValidation, ArbitraryRecord);
test(SetTimeRequestValidation, ArbitrarySetTimeRequest);
test(StatusValidation, ArbitraryStatus);
test(SubmitRequestValidation, ArbitrarySubmitRequest);
test(SubmitAndWaitRequestValidation, ArbitrarySubmitAndWaitRequest);
test(SubmitAndWaitForTransactionResponseValidation, ArbitrarySubmitAndWaitForTransactionResponse);
test(SubmitAndWaitForTransactionIdResponseValidation, ArbitrarySubmitAndWaitForTransactionIdResponse);
test(SubmitAndWaitForTransactionTreeResponseValidation, ArbitrarySubmitAndWaitForTransactionTreeResponse);
test(TimestampValidation, ArbitraryTimestamp);
test(TransactionFilterValidation, ArbitraryTransactionFilter);
test(TransactionValidation, ArbitraryTransaction);
test(TransactionTreeValidation, ArbitraryTransactionTree);
test(VariantValidation, ArbitraryVariant);
