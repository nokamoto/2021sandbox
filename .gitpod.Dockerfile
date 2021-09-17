FROM gitpod/workspace-full

RUN sudo add-apt-repository -y ppa:cncf-buildpacks/pack-cli &&
    sudo apt-get update && 
    sudo apt install -y protobuf-compiler clang-format pack-cli
