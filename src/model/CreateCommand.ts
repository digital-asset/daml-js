// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import {Identifier} from './Identifier';
import {Record} from './Record';

/**
 * Exercise a choice on an existing contract.
 *
 * Example:
 *
 * ```
 *  {
 *      commandType: 'create',
 *      templateId: {
 *          packageId: 'some-package-id',
 *          moduleName: 'SomeModule',
 *          entityName: 'SomeTemplate'
 *      },
 *      arguments: {
 *          fields: {
 *              owner: {
 *                  valueType: 'party',
 *                  party: 'Alice'
 *              }
 *          }
 *      }
 *  }
 * ```
 *
 * To express values in a more concise way, you can have a look at the {@link ValueHelpers}.
 *
 * @see Identifier
 * @see Record
 */
export interface CreateCommand {

    /**
     * A fixed type tag that identifies this as a create command
     */
    commandType: 'create',

    /**
     * The template of contract the client wants to create.
     */
    templateId: Identifier

    /**
     * The arguments required for creating a contract from this template.
     */
    arguments: Record
}