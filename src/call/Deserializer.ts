// Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Transform, TransformOptions} from 'stream';
import {Codec} from '../codec/Codec';

export class Deserializer<M, O> extends Transform {

    private readonly codec: Codec<M, O>

    constructor(mapping: Codec<M, O>, opts?: TransformOptions) {
        super(Object.assign(opts || {}, {objectMode: true}));
        this.codec = mapping;
    }

    _transform(message: M, _encoding: string, callback: Function): void {
        try {
            const next = message ? this.codec.deserialize(message) : null;
            this.push(next);
            callback();
        } catch (error) {
            callback(error);
        }
    }

}