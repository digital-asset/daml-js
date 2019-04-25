#!/usr/bin/env bash
# Copyright (c) 2019 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
# SPDX-License-IdentifierValidation: Apache-2.0

set -euxo pipefail

cd "$(dirname "${0}")"

GRPC_VERSION=1.18.0
SDK_VERSION=100.12.2

PROTO_PATH="./proto"
OUT_PATH="./src/generated"

function clean() {
    (cd "$(dirname "${0}")" && rm -rf "$PROTO_PATH" "$OUT_PATH")
}

trap clean ERR

if [ ! -d "$PROTO_PATH" ]; then
    mkdir -p "$PROTO_PATH" && (
      cd "$PROTO_PATH"
      curl -s https://digitalassetsdk.bintray.com/DigitalAssetSDK/com/digitalasset/ledger-api-protos/"$SDK_VERSION"/ledger-api-protos-"$SDK_VERSION".tar.gz | tar xz --strip-components 2
      curl -s https://digitalassetsdk.bintray.com/DigitalAssetSDK/com/digitalasset/daml-lf-archive-protos/"$SDK_VERSION"/daml-lf-archive-protos-"$SDK_VERSION".tar.gz | tar xz --strip-components 3
      mkdir -p da && mv com/digitalasset/daml_lf/* da && rm -rf com/digitalasset/daml_lf
      mkdir -p google/rpc
      curl -s https://raw.githubusercontent.com/grpc/grpc/v"$GRPC_VERSION"/src/proto/grpc/status/status.proto > google/rpc/status.proto
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
      "${PROTO_PATH}"/com/digitalasset/ledger/api/v1/testing/*.proto \
      "${PROTO_PATH}"/google/rpc/*.proto \
      "${PROTO_PATH}"/grpc/health/v1/*.proto
    grpc_tools_node_protoc \
      --plugin="protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`" \
      --js_out="import_style=commonjs,binary:${OUT_PATH}" \
      --proto_path="${PROTO_PATH}" \
      --grpc_out="${OUT_PATH}" \
      "${PROTO_PATH}"/da/*.proto
    grpc_tools_node_protoc \
      --plugin=protoc-gen-ts=`which protoc-gen-ts` \
      --proto_path="${PROTO_PATH}" \
      --ts_out="${OUT_PATH}" \
      "${PROTO_PATH}"/com/digitalasset/ledger/api/v1/*.proto \
      "${PROTO_PATH}"/com/digitalasset/ledger/api/v1/testing/*.proto \
      "${PROTO_PATH}"/google/rpc/*.proto \
      "${PROTO_PATH}"/grpc/health/v1/*.proto
    grpc_tools_node_protoc \
      --plugin=protoc-gen-ts=`which protoc-gen-ts` \
      --proto_path="${PROTO_PATH}" \
      --ts_out="${OUT_PATH}" \
      "${PROTO_PATH}"/da/*.proto
fi
