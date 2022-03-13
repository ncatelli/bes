# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.194.3/containers/rust/.devcontainer/base.Dockerfile

FROM mcr.microsoft.com/vscode/devcontainers/base:bullseye

ENV NVM_VERSION="v0.38.0"
ENV USERNAME="vscode"

COPY ./library-scripts /tmp/library-scripts
RUN su ${USERNAME} -c "bash /tmp/library-scripts/node-debian.sh"
RUN apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/* /root/.gnupg

RUN apt update && \
	apt install -y build-essential curl pkg-config libssl-dev

RUN su ${USERNAME} -c "bash /tmp/library-scripts/rustup.sh"