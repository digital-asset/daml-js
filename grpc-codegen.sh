#!/usr/bin/env bash
# Copyright (c) 2020 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-Identifier: Apache-2.0

set -euxo pipefail

cd "$(dirname "${0}")"

GRPC_VERSION=1.18.0
SDK_VERSION=100.13.55

PROTO_PATH="./proto"
OUT_PATH="./src/generated"
TEST_OUT_PATH="./test/generated"

function clean() {
    (cd "$(dirname "${0}")" && rm -rf "$PROTO_PATH" "$OUT_PATH")
}

trap clean ERR

if [ ! -d "$PROTO_PATH" ]; then
    mkdir -p "$PROTO_PATH" && (
      cd "$PROTO_PATH"
      curl -s https://repo1.maven.org/maven2/com/digitalasset/ledger-api-protos/$SDK_VERSION/ledger-api-protos-$SDK_VERSION.tar.gz | tar xz --strip-components 2
      curl -s https://digitalassetsdk.bintray.com/DigitalAssetSDK/com/digitalasset/daml-lf-1.6-archive-proto/"$SDK_VERSION"/daml-lf-1.6-archive-proto-"$SDK_VERSION".tar.gz | tar xz
      mkdir -p grpc/health/v1
      curl -s https://raw.githubusercontent.com/grpc/grpc/v"$GRPC_VERSION"/src/proto/grpc/health/v1/health.proto > grpc/health/v1/health.proto
      mkdir -p google/rpc
      curl -s https://raw.githubusercontent.com/grpc/grpc/v"$GRPC_VERSION"/src/proto/grpc/status/status.proto > google/rpc/status.proto
      mkdir -p grpc/reflection/v1alpha
      curl -s https://raw.githubusercontent.com/grpc/grpc/v"$GRPC_VERSION"/src/proto/grpc/reflection/v1alpha/reflection.proto > grpc/reflection/v1alpha/reflection.proto
    )
fi

if [ ! -d "$OUT_PATH" ]; then
    mkdir -p "$OUT_PATH"
    grpc_tools_node_protoc \
      --plugin="protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`" \
      --js_out="import_style=commonjs,binary:${OUT_PATH}" \
      --proto_path="${PROTO_PATH}" \
      --grpc_out="${OUT_PATH}" \
      "${PROTO_PATH}"/com/digitalasset/ledger/api/v1/*.proto \
      "${PROTO_PATH}"/com/digitalasset/ledger/api/v1/admin/*.proto \
      "${PROTO_PATH}"/com/digitalasset/ledger/api/v1/testing/*.proto \
      "${PROTO_PATH}"/google/rpc/*.proto \
      "${PROTO_PATH}"/grpc/health/v1/*.proto
    grpc_tools_node_protoc \
      --plugin="protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`" \
      --js_out="import_style=commonjs,binary:${OUT_PATH}" \
      --proto_path="${PROTO_PATH}" \
      --grpc_out="${OUT_PATH}" \
      "${PROTO_PATH}"/com/digitalasset/daml_lf_1_6/*.proto
    grpc_tools_node_protoc \
      --plugin=protoc-gen-ts=`which protoc-gen-ts` \
      --proto_path="${PROTO_PATH}" \
      --ts_out="${OUT_PATH}" \
      "${PROTO_PATH}"/com/digitalasset/ledger/api/v1/*.proto \
      "${PROTO_PATH}"/com/digitalasset/ledger/api/v1/admin/*.proto \
      "${PROTO_PATH}"/com/digitalasset/ledger/api/v1/testing/*.proto \
      "${PROTO_PATH}"/google/rpc/*.proto \
      "${PROTO_PATH}"/grpc/health/v1/*.proto
    grpc_tools_node_protoc \
      --plugin=protoc-gen-ts=`which protoc-gen-ts` \
      --proto_path="${PROTO_PATH}" \
      --ts_out="${OUT_PATH}" \
      "${PROTO_PATH}"/com/digitalasset/daml_lf_1_6/*.proto
fi

if [ ! -d "$TEST_OUT_PATH" ]; then
    mkdir -p "$TEST_OUT_PATH"
    grpc_tools_node_protoc \
      --plugin="protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`" \
      --js_out="import_style=commonjs,binary:${TEST_OUT_PATH}" \
      --proto_path="${PROTO_PATH}" \
      --grpc_out="${TEST_OUT_PATH}" \
      "${PROTO_PATH}"/grpc/reflection/v1alpha/reflection.proto
    grpc_tools_node_protoc \
      --plugin=protoc-gen-ts=`which protoc-gen-ts` \
      --proto_path="${PROTO_PATH}" \
      --ts_out="${TEST_OUT_PATH}" \
      "${PROTO_PATH}"/grpc/reflection/v1alpha/reflection.proto
fi
