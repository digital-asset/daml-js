# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]
### Added
- support for text map values (added in SDK 0.11.32)
- support for CreateAndExercise command (added in SDK 0.12.9)
- support for GetFlatTransactionById and GetFlatTransactionByEventId (added in SDK 0.12.14)

### Fixed
- add validation to GetTransactionById endpoint

## [0.5.0]
### Changed
- support SDK >=0.12.x
- use strings to represent numeric types to avoid precision loss
- use type tags to discriminate unions like events, commands and values

### Fixed
- runtime type validation checks that timestamps are represented as strings

