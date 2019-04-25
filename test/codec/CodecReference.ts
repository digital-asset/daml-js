// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {expect} from 'chai';

import {Timestamp as PbTimestamp} from 'google-protobuf/google/protobuf/timestamp_pb';
import {
    Identifier as PbIdentifier,
    Record as PbRecord,
    RecordField as PbRecordField,
    Value as PbValue,
    Variant as PbVariant
} from "../../src/generated/com/digitalasset/ledger/api/v1/value_pb";
import {
    Filters as PbFilters,
    InclusiveFilters as PbInclusiveFilters,
    TransactionFilter as PbTransactionFilter
} from "../../src/generated/com/digitalasset/ledger/api/v1/transaction_filter_pb";
import {Record} from "../../src/model/Record";
import {
    Command as PbCommand,
    Commands as PbCommands,
    CreateCommand as PbCreateCommand
} from "../../src/generated/com/digitalasset/ledger/api/v1/commands_pb";
import {InclusiveFiltersCodec} from "../../src/codec/InclusiveFiltersCodec";
import {FiltersCodec} from "../../src/codec/FiltersCodec";
import {TransactionFilterCodec} from "../../src/codec/TransactionFilterCodec";
import {RecordCodec} from "../../src/codec/RecordCodec";
import {SubmitRequestCodec} from "../../src/codec/SubmitRequestCodec";
import {SubmitRequest} from "../../src/model/SubmitRequest";
import {SubmitRequest as PbSubmitRequest} from "../../src/generated/com/digitalasset/ledger/api/v1/command_submission_service_pb";

describe('Reference Codec (InclusiveFiltersValidation)', () => {
    it('should not throw an error with a valid input', () => {
        const object = {
            templateIds: [{packageId: 'bar', moduleName: 'foo', entityName: 'baz'}]
        };
        expect(() => InclusiveFiltersCodec.serialize(object)).to.not.throw(
            Error
        );
    });

    it('should push the right number of items into the populated array', () => {
        const object = {
            templateIds: [{packageId: 'bar', moduleName: 'foo', entityName: 'baz'}]
        };
        const result = InclusiveFiltersCodec.serialize(object);
        expect(result.getTemplateIdsList()).to.have.lengthOf(1);
    });

    it('should push the correctly built items to the array', () => {
        const object = {
            templateIds: [{packageId: 'bar', moduleName: 'foo', entityName: 'baz'}]
        };
        const result = InclusiveFiltersCodec.serialize(object);
        const identifier = result.getTemplateIdsList()[0];
        expect(identifier.getModuleName()).to.equal('foo');
        expect(identifier.getEntityName()).to.equal('baz');
        expect(identifier.getPackageId()).to.equal('bar');
    });

    it('should work for more than one item as well', () => {
        const object = {
            templateIds: [
                {packageId: 'bar1', moduleName: 'foo1', entityName: 'baz1'},
                {packageId: 'bar2', moduleName: 'foo2', entityName: 'baz2'}
            ]
        };
        const result = InclusiveFiltersCodec.serialize(object);
        const identifier1 = result.getTemplateIdsList()[0];
        const identifier2 = result.getTemplateIdsList()[1];
        expect(identifier1.getPackageId()).to.equal('bar1');
        expect(identifier1.getModuleName()).to.equal('foo1');
        expect(identifier1.getEntityName()).to.equal('baz1');
        expect(identifier2.getPackageId()).to.equal('bar2');
        expect(identifier2.getModuleName()).to.equal('foo2');
        expect(identifier2.getEntityName()).to.equal('baz2');
    });

    it('should not throw exception with a valid "bean"', () => {
        const message = new PbInclusiveFilters();
        const identifier = new PbIdentifier();
        identifier.setPackageId('bar');
        identifier.setModuleName('foo');
        identifier.setEntityName('baz');
        message.setTemplateIdsList([identifier]);
        expect(() => InclusiveFiltersCodec.deserialize(message)).to.not.throw(
            Error
        );
    });

    it('should map array items with the correct values from beans to objects', () => {
        const message = new PbInclusiveFilters();
        const identifier = new PbIdentifier();
        identifier.setPackageId('bar');
        identifier.setModuleName('foo');
        identifier.setEntityName('baz');
        message.setTemplateIdsList([identifier]);
        expect(
            InclusiveFiltersCodec.deserialize(message).templateIds[0]
        ).to.deep.equal({packageId: 'bar', moduleName: 'foo', entityName: 'baz'});
    });

    it('should map array items with the correct values from beans to objects with multiple items', () => {
        const message = new PbInclusiveFilters();
        const identifier1 = new PbIdentifier();
        identifier1.setPackageId('bar1');
        identifier1.setModuleName('foo1');
        identifier1.setEntityName('baz1');
        const identifier2 = new PbIdentifier();
        identifier2.setPackageId('bar2');
        identifier2.setModuleName('foo2');
        identifier2.setEntityName('baz2');
        message.setTemplateIdsList([identifier1, identifier2]);
        expect(InclusiveFiltersCodec.deserialize(message)).to.deep.equal({
            templateIds: [
                {packageId: 'bar1', moduleName: 'foo1', entityName: 'baz1'},
                {packageId: 'bar2', moduleName: 'foo2', entityName: 'baz2'}
            ]
        });
    });
});

describe('Reference Codec (FiltersValidation)', () => {
    it('should not set any property unless explicitly told to', () => {
        const message = FiltersCodec.serialize({});
        expect(message.getInclusive()).to.be.undefined;
    });

    it('should not throw an error when converting an empty array', () => {
        const conversion = () =>
            FiltersCodec.serialize({inclusive: {templateIds: []}});
        expect(conversion).to.not.throw(Error);
    });

    it('should yield the expected value for nested properties of an empty object', () => {
        const result = FiltersCodec.serialize({
            inclusive: {templateIds: []}
        });
        expect(result.getInclusive()!.getTemplateIdsList()).to.have.length(0);
    });

    it('should not throw an error when converting an array with one item', () => {
        const conversion = () =>
            FiltersCodec.serialize({
                inclusive: {
                    templateIds: [
                        {packageId: 'bar', moduleName: 'foo', entityName: 'baz'}
                    ]
                }
            });
        expect(conversion).to.not.throw(Error);
    });

    it('should convert a valid object with a one-item array to its properly sized value', () => {
        const result = FiltersCodec.serialize({
            inclusive: {
                templateIds: [
                    {packageId: 'bar', moduleName: 'foo', entityName: 'baz'}
                ]
            }
        });
        expect(result.getInclusive()!.getTemplateIdsList()).to.have.length(1);
    });

    it('should convert a valid object with a one-item array to its proper value for nested properties', () => {
        const result = FiltersCodec.serialize({
            inclusive: {
                templateIds: [
                    {packageId: 'bar', moduleName: 'foo', entityName: 'baz'}
                ]
            }
        });
        expect(
            result
                .getInclusive()!
                .getTemplateIdsList()[0]
                .getPackageId()
        ).to.equal('bar');
        expect(
            result
                .getInclusive()!
                .getTemplateIdsList()[0]
                .getModuleName()
        ).to.equal('foo');
        expect(
            result
                .getInclusive()!
                .getTemplateIdsList()[0]
                .getEntityName()
        ).to.equal('baz');
    });

    it('should not throw an error when converting an array with two items', () => {
        const conversion = () =>
            FiltersCodec.serialize({
                inclusive: {
                    templateIds: [
                        {packageId: 'bar1', moduleName: 'foo1', entityName: 'baz1'},
                        {packageId: 'bar2', moduleName: 'foo2', entityName: 'baz2'}
                    ]
                }
            });
        expect(conversion).to.not.throw(Error);
    });

    it('should convert a valid object with a two-item array to its properly sized value', () => {
        const result = FiltersCodec.serialize({
            inclusive: {
                templateIds: [
                    {packageId: 'bar1', moduleName: 'foo1', entityName: 'baz1'},
                    {packageId: 'bar2', moduleName: 'foo2', entityName: 'baz2'}
                ]
            }
        });
        expect(result.getInclusive()!.getTemplateIdsList()).to.have.length(2);
    });
});

describe('Reference Codec (TransactionFilterValidation)', () => {
    it('should not throw when converting a valid, empty input', () => {
        const filter = {filtersByParty: {}};
        const conversion = () => TransactionFilterCodec.serialize(filter);
        expect(conversion).to.not.throw(Error);
    });

    it('should result in the correct content value for an empty object', () => {
        const filter = {filtersByParty: {}};
        const result = TransactionFilterCodec.serialize(filter);
        expect(result.getFiltersByPartyMap().toArray()).to.have.lengthOf(0);
    });

    it('should add a key for a valid empty object as input', () => {
        const filter = {
            filtersByParty: {
                someKey: {}
            }
        };
        const result = TransactionFilterCodec.serialize(filter);
        const map = result.getFiltersByPartyMap();
        expect(map.has('someKey')).to.be.true;
    });

    it('should add a correctly empty value for a valid empty object as input', () => {
        const filter = {
            filtersByParty: {
                someKey: {}
            }
        };
        const result = TransactionFilterCodec.serialize(filter);
        const map = result.getFiltersByPartyMap();
        expect(map.get('someKey')!.getInclusive()).to.be.undefined;
    });

    it('should add a fully built value for a valid object as input', () => {
        const filter = {
            filtersByParty: {
                someKey: {inclusive: {templateIds: []}}
            }
        };
        const result = TransactionFilterCodec.serialize(filter);
        const map = result.getFiltersByPartyMap();
        expect(map.get('someKey')!.getInclusive()).to.not.be.undefined;
    });

    it('should not throw when converting a valid, empty message', () => {
        const message = new PbTransactionFilter();
        const conversion = () => TransactionFilterCodec.deserialize(message);
        expect(conversion).to.not.throw(Error);
    });

    it('should fill in the properties correctly for an empty input message', () => {
        const message = new PbTransactionFilter();
        const result = TransactionFilterCodec.deserialize(message);
        expect(result.filtersByParty).to.be.empty;
    });

    it('should fill in the properties for a non-empty input message with empty nested properties', () => {
        const message = new PbTransactionFilter();
        const map = message.getFiltersByPartyMap();
        map.set('someKey', new PbFilters());
        const result = TransactionFilterCodec.deserialize(message);
        expect(result.filtersByParty).to.not.be.empty;
    });

    it('should fill in the properties correctly for a non-empty input message with non-empty nested properties', () => {
        const transactionFilter = new PbTransactionFilter();
        const map = transactionFilter.getFiltersByPartyMap();
        const filters = new PbFilters();
        const inclusive = new PbInclusiveFilters();
        const identifier1 = new PbIdentifier();
        identifier1.setPackageId('bar1');
        identifier1.setModuleName('foo1');
        identifier1.setEntityName('baz1');
        const identifier2 = new PbIdentifier();
        identifier2.setPackageId('bar2');
        identifier2.setModuleName('foo2');
        identifier2.setEntityName('baz2');
        inclusive.setTemplateIdsList([identifier1, identifier2]);
        filters.setInclusive(inclusive);
        map.set('someKey', filters);
        const result = TransactionFilterCodec.deserialize(transactionFilter);
        expect(result).to.deep.equal({
            filtersByParty: {
                someKey: {
                    inclusive: {
                        templateIds: [
                            {packageId: 'bar1', moduleName: 'foo1', entityName: 'baz1'},
                            {packageId: 'bar2', moduleName: 'foo2', entityName: 'baz2'}
                        ]
                    }
                }
            }
        });
    });

    it('should fill in the properties correctly for a non-empty input message with empty and non-empty nested properties', () => {
        const transactionFilter = new PbTransactionFilter();
        const map = transactionFilter.getFiltersByPartyMap();
        const filters = new PbFilters();
        const inclusive = new PbInclusiveFilters();
        const identifier1 = new PbIdentifier();
        identifier1.setPackageId('bar1');
        identifier1.setModuleName('foo1');
        identifier1.setEntityName('baz1');
        const identifier2 = new PbIdentifier();
        identifier2.setPackageId('bar2');
        identifier2.setModuleName('foo2');
        identifier2.setEntityName('baz2');
        inclusive.setTemplateIdsList([identifier1, identifier2]);
        filters.setInclusive(inclusive);
        map.set('someKey', filters);
        map.set('someOtherKey', new PbFilters());
        const result = TransactionFilterCodec.deserialize(transactionFilter);
        expect(result).to.deep.equal({
            filtersByParty: {
                someOtherKey: {},
                someKey: {
                    inclusive: {
                        templateIds: [
                            {packageId: 'bar1', moduleName: 'foo1', entityName: 'baz1'},
                            {packageId: 'bar2', moduleName: 'foo2', entityName: 'baz2'}
                        ]
                    }
                }
            }
        });
    });
});

describe('Reference Codec (SubmitRequestValidation)', () => {
    const command = new PbCommand();

    const templateId = new PbIdentifier();
    templateId.setModuleName('templateId-moduleName');
    templateId.setEntityName('templateId-entityName');
    templateId.setPackageId('templateId-packageId');

    const recordId = new PbIdentifier();
    recordId.setModuleName('recordId-moduleName');
    recordId.setEntityName('recordId-entityName');
    recordId.setPackageId('recordId-packageId');

    const create = new PbCreateCommand();
    create.setTemplateId(templateId);

    const record = new PbRecord();
    record.setRecordId(recordId);

    const senderField = new PbRecordField();
    senderField.setLabel('sender');
    const senderValue = new PbValue();
    senderValue.setParty('sender-party');
    senderField.setValue(senderValue);
    record.addFields(senderField);

    const receiverField = new PbRecordField();
    receiverField.setLabel('receiver');
    const receiverValue = new PbValue();
    receiverValue.setParty('receiver-party');
    receiverField.setValue(receiverValue);
    record.addFields(receiverField);

    const countField = new PbRecordField();
    countField.setLabel('count');
    const countValue = new PbValue();
    countValue.setInt64('42');
    countField.setValue(countValue);
    record.addFields(countField);
    create.setCreateArguments(record);

    command.setCreate(create);

    const message = new PbSubmitRequest();

    const commands = new PbCommands();
    commands.setLedgerId('ledgerId');

    const ledgerEffectiveTime = new PbTimestamp();
    ledgerEffectiveTime.setSeconds(47);
    ledgerEffectiveTime.setNanos(68);
    commands.setLedgerEffectiveTime(ledgerEffectiveTime);

    const maximumRecordTime = new PbTimestamp();
    maximumRecordTime.setSeconds(94);
    maximumRecordTime.setNanos(140);
    commands.setMaximumRecordTime(maximumRecordTime);

    commands.setCommandId('command-commandId');
    commands.setWorkflowId('command-workflowId');
    commands.setParty('command-party');
    commands.setApplicationId('command-applicationId');
    commands.setCommandsList([command]);

    message.setCommands(commands);

    const object: SubmitRequest = {
        commands: {
            ledgerEffectiveTime: {seconds: 47, nanoseconds: 68},
            maximumRecordTime: {seconds: 94, nanoseconds: 140},
            commandId: 'command-commandId',
            workflowId: 'command-workflowId',
            party: 'command-party',
            applicationId: 'command-applicationId',
            list: [
                {
                    __type__: 'create',
                    templateId: {
                        packageId: 'templateId-packageId',
                        moduleName: 'templateId-moduleName',
                        entityName: 'templateId-entityName'
                    },
                    arguments: {
                        recordId: {
                            packageId: 'recordId-packageId',
                            moduleName: 'recordId-moduleName',
                            entityName: 'recordId-entityName'
                        },
                        fields: {
                            sender: {__type__: 'party', party: 'sender-party'},
                            receiver: {__type__: 'party', party: 'receiver-party'},
                            count: {__type__: 'int64', int64: '42'}
                        }
                    }
                }
            ]
        }
    };

    it('should correctly translate a message to an object', () => {
        expect(SubmitRequestCodec.deserialize(message)).to.deep.equal(object);
    });

    it('should translate an object to a message both ways while preserving meaning', () => {
        expect(
            SubmitRequestCodec.deserialize(SubmitRequestCodec.serialize(object))
        ).to.deep.equal(object);
    });
});

describe('Reference Codec (SubmitRequestValidation/Pvp)', () => {
    const command = new PbCommand();

    const pvpId = new PbIdentifier();
    pvpId.setModuleName('mod1');
    pvpId.setEntityName('PvP');
    pvpId.setPackageId('934023fa9c89e8f89b8a');

    const create = new PbCreateCommand();
    create.setTemplateId(pvpId);

    const record = new PbRecord();
    record.setRecordId(pvpId);

    const baseAmountField = new PbRecordField();
    baseAmountField.setLabel('baseAmount');
    const baseAmountValue = new PbValue();
    baseAmountValue.setDecimal('1000000.00');
    baseAmountField.setValue(baseAmountValue);
    record.addFields(baseAmountField);

    const baseCurrencyField = new PbRecordField();
    baseCurrencyField.setLabel('baseCurrency');
    const baseCurrencyValue = new PbValue();
    baseCurrencyValue.setText('CHF');
    baseCurrencyField.setValue(baseCurrencyValue);
    record.addFields(baseCurrencyField);

    const baseIouCidField = new PbRecordField();
    baseIouCidField.setLabel('baseIouCid');
    const baseIouCidValue = new PbValue();
    const baseIouCidVariant = new PbVariant();
    baseIouCidVariant.setConstructor('Maybe');
    const baseIouCidVariantId = new PbIdentifier();
    baseIouCidVariantId.setModuleName('mod2');
    baseIouCidVariantId.setEntityName('Maybe');
    baseIouCidVariantId.setPackageId('ba777d8d7c88e87f7');
    baseIouCidVariant.setVariantId(baseIouCidVariantId);
    const baseIouCidVariantValue = new PbValue();
    baseIouCidVariantValue.setContractId('76238b8998a98d98e978f');
    baseIouCidVariant.setValue(baseIouCidVariantValue);
    baseIouCidValue.setVariant(baseIouCidVariant);
    baseIouCidField.setValue(baseIouCidValue);
    record.addFields(baseIouCidField);

    const baseIssuerField = new PbRecordField();
    baseIssuerField.setLabel('baseIssuer');
    const baseIssuerValue = new PbValue();
    baseIssuerValue.setParty('some-base-issuer');
    baseIssuerField.setValue(baseIssuerValue);
    record.addFields(baseIssuerField);

    const buyerField = new PbRecordField();
    buyerField.setLabel('buyer');
    const buyerValue = new PbValue();
    buyerValue.setParty('some-buyer');
    buyerField.setValue(buyerValue);
    record.addFields(buyerField);

    const quoteAmountField = new PbRecordField();
    quoteAmountField.setLabel('quoteAmount');
    const quoteAmountValue = new PbValue();
    quoteAmountValue.setDecimal('1000001.00');
    quoteAmountField.setValue(quoteAmountValue);
    record.addFields(quoteAmountField);

    const quoteCurrencyField = new PbRecordField();
    quoteCurrencyField.setLabel('quoteCurrency');
    const quoteCurrencyValue = new PbValue();
    quoteCurrencyValue.setText('USD');
    quoteCurrencyField.setValue(quoteCurrencyValue);
    record.addFields(quoteCurrencyField);

    const quoteIouCidField = new PbRecordField();
    quoteIouCidField.setLabel('quoteIouCid');
    const quoteIouCidValue = new PbValue();
    const quoteIouCidVariant = new PbVariant();
    quoteIouCidVariant.setConstructor('Maybe');
    const quoteIouCidVariantId = new PbIdentifier();
    quoteIouCidVariantId.setModuleName('mod2');
    quoteIouCidVariantId.setEntityName('Maybe');
    quoteIouCidVariantId.setPackageId('ba777d8d7c88e87f7');
    quoteIouCidVariant.setVariantId(quoteIouCidVariantId);
    const quoteIouCidVariantValue = new PbValue();
    quoteIouCidVariantValue.setContractId('76238b8998a98d98e978f');
    quoteIouCidVariant.setValue(quoteIouCidVariantValue);
    quoteIouCidValue.setVariant(quoteIouCidVariant);
    quoteIouCidField.setValue(quoteIouCidValue);
    record.addFields(quoteIouCidField);

    const quoteIssuerField = new PbRecordField();
    quoteIssuerField.setLabel('quoteIssuer');
    const quoteIssuerValue = new PbValue();
    quoteIssuerValue.setParty('some-quote-issuer');
    quoteIssuerField.setValue(quoteIssuerValue);
    record.addFields(quoteIssuerField);

    const sellerField = new PbRecordField();
    sellerField.setLabel('seller');
    const sellerValue = new PbValue();
    sellerValue.setParty('some-seller');
    sellerField.setValue(sellerValue);
    record.addFields(sellerField);

    const settleTimeField = new PbRecordField();
    settleTimeField.setLabel('settleTime');
    const settleTimeValue = new PbValue();
    settleTimeValue.setTimestamp('93641099000000000');
    settleTimeField.setValue(settleTimeValue);
    record.addFields(settleTimeField);

    create.setCreateArguments(record);

    command.setCreate(create);

    const message = new PbSubmitRequest();

    const commands = new PbCommands();
    commands.setLedgerId('ledgerId');

    const ledgerEffectiveTime = new PbTimestamp();
    ledgerEffectiveTime.setSeconds(0);
    ledgerEffectiveTime.setNanos(0);
    commands.setLedgerEffectiveTime(ledgerEffectiveTime);

    const maximumRecordTime = new PbTimestamp();
    maximumRecordTime.setSeconds(5);
    maximumRecordTime.setNanos(0);
    commands.setMaximumRecordTime(maximumRecordTime);

    commands.setCommandId('78676d87b86d86');
    commands.setWorkflowId('some-workflow-id');
    commands.setParty('some-sender');
    commands.setApplicationId('some-app-id');
    commands.setCommandsList([command]);

    message.setCommands(commands);

    const reference = {
        commands: {
            ledgerEffectiveTime: {seconds: 0, nanoseconds: 0},
            maximumRecordTime: {seconds: 5, nanoseconds: 0},
            commandId: '78676d87b86d86',
            workflowId: 'some-workflow-id',
            party: 'some-sender',
            applicationId: 'some-app-id',
            list: [
                {
                    create: {
                        templateId: {
                            packageId: '934023fa9c89e8f89b8a',
                            moduleName: 'mod1',
                            entityName: 'PvP'
                        },
                        arguments: {
                            recordId: {
                                packageId: '934023fa9c89e8f89b8a',
                                moduleName: 'mod1',
                                entityName: 'PvP'
                            },
                            fields: {
                                buyer: {party: 'some-buyer'},
                                seller: {party: 'some-seller'},
                                baseIssuer: {party: 'some-base-issuer'},
                                baseCurrency: {text: 'CHF'},
                                baseAmount: {decimal: '1000000.00'},
                                baseIouCid: {
                                    variant: {
                                        variantId: {
                                            packageId: 'ba777d8d7c88e87f7',
                                            moduleName: 'mod2',
                                            entityName: 'Maybe'
                                        },
                                        constructor: 'Maybe',
                                        value: {contractId: '76238b8998a98d98e978f'}
                                    }
                                },
                                quoteIssuer: {party: 'some-quote-issuer'},
                                quoteCurrency: {text: 'USD'},
                                quoteAmount: {decimal: '1000001.00'},
                                quoteIouCid: {
                                    variant: {
                                        variantId: {
                                            packageId: 'ba777d8d7c88e87f7',
                                            moduleName: 'mod2',
                                            entityName: 'Maybe'
                                        },
                                        constructor: 'Maybe',
                                        value: {contractId: '76238b8998a98d98e978f'}
                                    }
                                },
                                settleTime: {timestamp: '93641099000000000'}
                            }
                        }
                    }
                }
            ]
        }
    };

    it('should match exactly the expected result', () => {
        expect(SubmitRequestCodec.deserialize(message)).to.deep.equal(reference);
    });
});

describe('Non-verbose records', () => {
    it('should be mapped to numeric indexes', () => {
        const expected: Record = {
            fields: {
                '0': {__type__: 'int64', int64: '42'},
                '1': {__type__: 'contractId', contractId: '0123456789abcdef'},
                '2': {__type__: 'bool', bool: true}
            }
        };
        const record: PbRecord = new PbRecord();
        const value0: PbValue = new PbValue();
        const field0: PbRecordField = new PbRecordField();
        const value1: PbValue = new PbValue();
        const field1: PbRecordField = new PbRecordField();
        const value2: PbValue = new PbValue();
        const field2: PbRecordField = new PbRecordField();
        field0.setValue(value0);
        value0.setInt64('42');
        field1.setValue(value1);
        value1.setContractId('0123456789abcdef');
        field2.setValue(value2);
        value2.setBool(true);
        record.setFieldsList([field0, field1, field2]);
        expect(RecordCodec.deserialize(record)).to.deep.equal(expected);
    });
});
