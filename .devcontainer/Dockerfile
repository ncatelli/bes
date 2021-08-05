# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.183.0/containers/rust/.devcontainer/base.Dockerfile

FROM mcr.microsoft.com/vscode/devcontainers/rust:0-1

ENV NVM_VERSION="v0.38.0"
ENV USERNAME="vscode"

COPY ./library-scripts /tmp/library-scripts
RUN su ${USERNAME} -c "bash /tmp/library-scripts/node-debian.sh"
RUN apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/* /root/.gnupg 
