
.PHONY: all
all: fmt lint build test

.PHONY: fmt
fmt:
	cargo fmt

.PHONY: lint
lint:
	cargo clippy -- -D warnings

.PHONY: build
build:
	cargo build

.PHONY: test
test:
	cargo test
