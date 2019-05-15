// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import * as ledger from './src';
import * as fs from 'fs';
import {v4 as uuid} from 'uuid';

const start = Date.now();
console.log('Sending wake up call to ledger module lazy loading...');

const packageId = ledger.lf.Archive.deserializeBinary(fs.readFileSync(`${__dirname}/test/integration/src/dist/IntegrationTests.dalf`)).getHash();

ledger.DamlLedgerClient.connect({host: '0.0.0.0', port: parseInt(process.env['DAML_SANDBOX_PORT'])!}, (error, client) => {
    if (error) throw error;
    const wakeUpCall: ledger.SubmitAndWaitRequest = {
        commands: {
            workflowId: 'WakeUpCall',
            party: 'EagerJoe',
            maximumRecordTime: {seconds: 5, nanoseconds: 0},
            ledgerEffectiveTime: {seconds: 0, nanoseconds: 0},
            commandId: uuid(),
            applicationId: 'Alarm',
            list: [{
                commandType: 'createAndExercise',
                templateId: {
                    packageId: packageId,
                    moduleName: 'IntegrationTests',
                    entityName: 'AlarmClock'
                },
                createArguments: {
                    fields: {
                        sleeper: { valueType: 'party', party: 'EagerJoe' }
                    }
                },
                choice: 'WakeUp',
                choiceArgument: { valueType: 'record', fields: {} }
            }]
        }
    };
    client.commandClient.submitAndWait(wakeUpCall, (error) => {
        if (error) throw error;
        const end = Date.now();
        console.log(`Module loaded after ${end - start} ms`);
    });
});