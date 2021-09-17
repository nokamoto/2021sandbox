FROM gitpod/workspace-full

USER gitpod

RUN go install github.com/bazelbuild/bazelisk@v1.10.1
