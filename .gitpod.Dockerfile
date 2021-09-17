FROM gitpod/workspace-full

RUN go install github.com/bazelbuild/bazelisk@v1.10.1
