FROM gitpod/workspace-full

USER root

RUN go install github.com/bazelbuild/bazelisk@v1.10.1
