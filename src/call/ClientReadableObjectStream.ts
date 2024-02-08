// Copyright (c) 2024 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Readable, ReadableOptions} from 'stream';
import {Codec} from '../codec/Codec';
import {ClientReadableStream} from '@grpc/grpc-js';
import {Deserializer} from "./Deserializer";

/**
 * A stream of objects that are pushed from the server and are readable from
 * the client. It it a Readable Node.js stream and wraps the call to gRPC.
 */
export class ClientReadableObjectStream<O> extends Readable {

    private readonly wrappedStream?: ClientReadableStream<any>
    private readonly deserializedStream?: Deserializer<any, O>

    private constructor(wrappedStream: Error | ClientReadableStream<any>, codec?: Codec<any, O>, opts?: ReadableOptions) {
        super(Object.assign(opts || {}, {objectMode: true}));
        if (!(wrappedStream instanceof Error) && codec !== undefined) {
            this.wrappedStream = wrappedStream;
            this.deserializedStream = this.wrappedStream.pipe(new Deserializer(codec));
            this.deserializedStream.on('readable', () => this._read());
            this.deserializedStream.on('finish', () => this.emit('end'));
        } else if (wrappedStream instanceof Error) {
            process.nextTick(() => {
                this.emit('error', wrappedStream);
                process.nextTick(() => {
                    this.emit('end');
                });
            });
        }
    }

    static from<O>(wrapped: Error): ClientReadableObjectStream<O>
    static from<T, O>(wrapped: ClientReadableStream<T>, codec: Codec<T, O>, opts?: ReadableOptions): ClientReadableObjectStream<O>
    static from<O>(wrapped: Error | ClientReadableStream<any>, codec?: Codec<any, O>, opts?: ReadableOptions): ClientReadableObjectStream<O> {
        if (wrapped instanceof Error) {
            return new ClientReadableObjectStream<O>(wrapped);
        } else {
            return new ClientReadableObjectStream<O>(wrapped, codec, opts);
        }
    }

    _read(): void {
        if (this.deserializedStream) {
            const object = this.deserializedStream.read();
            if (object) {
                this.push(object);
            }
        }
    }

    /**
     * Cancel the ongoing call. Results in the call ending with a CANCELLED status,
     * unless it has already ended with some other status.
     */
    cancel(): void {
        if (this.wrappedStream) {
            this.wrappedStream.cancel();
        }
    }

    /**
     * Get the endpoint this call/stream is connected to.
     *
     * @returns {string} The URI of the endpoint
     */
    getPeer(): string {
        if (this.wrappedStream) {
            return this.wrappedStream.getPeer();
        } else {
            return '';
        }
    }

}
