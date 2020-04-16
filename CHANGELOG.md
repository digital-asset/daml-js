# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [0.10.0]
### Removed
- `ledgerEffectiveTime` and `maximumRecordTime` have been dropped by commands [#107](https://github.com/digital-asset/daml-js/issues/107)
- `maxTtl` and `minTtl` have been dropped by ledger configuration [#107](https://github.com/digital-asset/daml-js/issues/107)

### Added
- supports SDK 1.0.0 [#110](https://github.com/digital-asset/daml-js/issue/110)
- `maxDeduplicationTime` has been added to the ledger configuration response [#107](https://github.com/digital-asset/daml-js/issues/107)

### Fixed
- the `knownSince` field is now correctly encoded into a plain object [#107](https://github.com/digital-asset/daml-js/issues/107)

## [0.9.1]
### Added
- add support for enum values from SDK 0.13.13 [#97](https://github.com/digital-asset/daml-js/issues/97)
- add support for signatories and observers in created events from SDK 0.13.8 [#96](https://github.com/digital-asset/daml-js/issues/96)
- add support for contract keys in created events from SDK 0.12.25 [#95](https://github.com/digital-asset/daml-js/issues/95)
- add support for DAML-LF 1.8 (and earlier) [#98](https://github.com/digital-asset/daml-js/issues/98)
- the call to `getTransactionTrees` is now verbose by default (mirroring `getTransactions`) [#102](https://github.com/digital-asset/daml-js/issues/102)
- `LedgerClientOptions` now has an optional `grpcOption` key where options for the gRPC clients can be passed; options are passed as is, refer to the [official gRPC documentation](https://grpc.github.io/grpc/core/group__grpc__arg__keys.html) [#16](https://github.com/digital-asset/daml-js/issues/16)

## [0.9.0]
### Changed
- support SDK 0.13.55 [#92](https://github.com/digital-asset/daml-js/pull/92)

### Removed
- **BREAKING**: `ExercisedEvent` no longer exposes the field `contractCreatingEventId` as it's been dropped by the SDK.

## [0.8.3]
- fix bug to expose package management client from SDK 0.12.25 [#88](https://github.com/digital-asset/daml-js/pull/88)

## [0.8.2]
- complete support for package management by adding support for list know packages and upload dar file from SDK 0.12.25 [#85](https://github.com/digital-asset/daml-js/pull/85)

## [0.8.1]
- complete support for party management by adding support for participant identifier retrieval from SDK 0.12.25 [#83](https://github.com/digital-asset/daml-js/pull/83)

## [0.8.0]
### Added
- add support for party allocation and listing from SDK 0.12.25 [#79](https://github.com/digital-asset/daml-js/issues/79)

## [0.7.0]
### Added
- add "promisified" version for all relevant endpoints [#72](https://github.com/digital-asset/daml-js/issues/72)

## [0.6.1]
### Fixed
- fix validation of optional DAML values [#68](https://github.com/digital-asset/daml-js/issues/68)

## [0.6.0]
### Changed
- make offset in completion stream requests optional to reflect the Ledger API [#60](https://github.com/digital-asset/daml-js/issues/60)

### Added
- the bindings representation of ledger and DAML values is not thoroughly documented [#58](https://github.com/digital-asset/daml-js/issues/58)
- catch invalid string representation of integer values [#57](https://github.com/digital-asset/daml-js/issues/57)
- add value helpers [#34](https://github.com/digital-asset/daml-js/issues/34)
- added agreement text to created events [#54](https://github.com/digital-asset/daml-js/issues/54)
- improved error messages for missing cases for unknown union type cases [#49](https://github.com/digital-asset/daml-js/issues/49)
- support for exercise result in ExercisedEvent from SDK 0.12.16 [#20](https://github.com/digital-asset/daml-js/issues/20)
- support for SubmitAndWait with results from SDK 0.12.15 [#19](https://github.com/digital-asset/daml-js/issues/19)
- support for text map values from SDK 0.11.32 [#17](https://github.com/digital-asset/daml-js/issues/17)
- support for CreateAndExercise command from SDK 0.12.9 [#12](https://github.com/digital-asset/daml-js/issues/12)
- support for GetFlatTransactionById and GetFlatTransactionByEventId from SDK 0.12.14 [#18](https://github.com/digital-asset/daml-js/issues/18)

### Removed
- **BREAKING**: `ExercisedEvent` has been removed from `Event` union [#52](https://github.com/digital-asset/daml-js/issues/52)

### Fixed
- add validation to GetTransactionById endpoint

## [0.5.0]
### Changed
- support SDK >=0.12.x
- use strings to represent numeric types to avoid precision loss
- use type tags to discriminate unions like events, commands and values

### Fixed
- runtime type validation checks that timestamps are represented as strings

