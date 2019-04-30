# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [0.5.0]
### Changed
- support SDK >=0.12.x
- use strings to represent numeric types to avoid precision loss
- use type tags to discriminate unions like events, commands and values

### Fixed
- runtime type validation checks that timestamps are represented as strings

