# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.202.1/containers/codespaces-linux/.devcontainer/base.Dockerfile

FROM mcr.microsoft.com/vscode/devcontainers/universal:1-focal

USER root

RUN add-apt-repository -y ppa:cncf-buildpacks/pack-cli

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends protobuf-compiler clang-format pack-cli

USER codespace
