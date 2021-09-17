FROM gitpod/workspace-full

RUN sudo apt-get update && sudo apt install -y protobuf-compiler
