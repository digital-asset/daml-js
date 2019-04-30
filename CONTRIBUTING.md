# Contributing

## General guidelines and code of conduct

This repository follows the same [contribution guidelines](https://github.com/digital-asset/daml/blob/master/CONTRIBUTING.md) and [code of conduct](https://github.com/digital-asset/daml/blob/master/CODE_OF_CONDUCT.md) as the [main DAML repository](https://github.com/digital-asset/daml/).

## Build and test

This project uses [NPM](https://npmjs.com/) to manage the dependencies and the environment of scripts handling the build lifecycle.

Before you start coding, install the dependencies:

    npm install

Once this is done you can run the full build:

    npm test

The full build consists of:

1. downloading the Ledger API ProtoBuffer service definitions from [Digital Asset's Bintray](https://bintray.com/digitalassetsdk/),
2. generating the [gRPC](https://grpc.io/) stubs,
3. running the [TypeScript](http://typescriptlang.org/) compilation, and finally
4. running the tests using [Mocha](https://mochajs.org/).

Steps 1 and 2 are executed only if the `proto` and `src/generated` directories are not available locally.

To force these build phases to run again (e.g. because the bindings now depend on a new version of the gRPC Ledger API definitions), run the following before re-running `npm test`:

    rm -rf proto src/generated

## Release

The following steps are to be followed in order to release a new version of the bindings:

1.  Choose a new version number `<version>` (the `0.x` release series does not uphold semantic versioning)
2.  Create the branch `release-<version>`
3.  Change the title of the [unreleased section in the changelog](./CHANGELOG.md#Unreleased) to the chosen `<version>`
4.  Commit the outstanding change (e.g. `git add CHANGELOG.md && git commit -m "Update changelog")
5.  Run the command `npm version --no-git-tag-version <version>`
6.  Open a pull request with the title "Release <version>", have it reviewed, squashed and merged
7.  After the pull request has been squashed and merged, pull the master locally
8.  Tag the commit resulting from step 6 with the name `<version>`
9.  Push the tag created in the previous step
10. Publish with `npm publish`

To publish the documentation, start from where you left off and then:

11. Create the documentation for the release with `npm run release-docs`
12. Checkout the `gh-pages` branch
13. Add the generated documentation to this branch
14. Update the `latest` symbolic link to point to the new docs
15. Give a meaningful commit name and push it

