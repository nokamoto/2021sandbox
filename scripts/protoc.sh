#!/bin/bash

set -eux

DIR=internal/proto

mkdir -p ${DIR}

protoc \
    --go_out=${DIR} --go_opt=paths=source_relative \
    --go-grpc_out=${DIR} --go-grpc_opt=paths=source_relative \
    api/example/v1alpha/*.proto
