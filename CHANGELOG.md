# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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

