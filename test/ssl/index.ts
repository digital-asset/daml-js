// Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-IdentifierValidation: Apache-2.0

import {readFileSync} from 'fs';

export const RootCertChain: Buffer = readFileSync(`${__dirname}/ca.crt`);
export const ServerCertChain: Buffer = readFileSync(`${__dirname}/server.crt`);
export const ServerPrivateKey: Buffer = readFileSync(`${__dirname}/server.key`);
export const ClientCertChain: Buffer = readFileSync(`${__dirname}/client.crt`);
export const ClientPrivateKey: Buffer = readFileSync(`${__dirname}/client.key`);
