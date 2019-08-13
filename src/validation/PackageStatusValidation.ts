// Copyright (c) 2019 The DAML Authors. All rights reserved.
// SPDX-License-Identifier: Apache-2.0


import {PackageStatus} from "../model/PackageStatus";
import {enumeration} from "./Enumeration";

export const PackageStatusValidation = enumeration(PackageStatus, 'PackageStatus')