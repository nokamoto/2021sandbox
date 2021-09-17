PROTO_FILES := $(shell find api -type f -name *.proto)
PROTO_GEN_DIR = internal/proto

.PHONY: go
go: go-fmt go-test
	go mod tidy

.PHONY: go-build-example
go-build-example:
	pack build example --builder gcr.io/buildpacks/builder:v1 

.PHONY: go-fmt
go-fmt:
	go fmt ./...

.PHONY: go-run-example
go-run-example:
	GRPC_PORT=9000 go run ./cmd/example

.PHONY: go-test
go-test:
	go test -v ./...

.PHONY: protoc
protoc:
	protoc \
		--go_out=$(PROTO_GEN_DIR) --go_opt=paths=source_relative \
    	--go-grpc_out=$(PROTO_GEN_DIR) --go-grpc_opt=paths=source_relative \
   		$(PROTO_FILES)

.PHONY: proto-fmt
proto-fmt:
	find . -type f -name *.proto | xargs clang-format -i
