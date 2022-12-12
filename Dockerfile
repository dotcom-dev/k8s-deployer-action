FROM node:19.2-alpine AS build

# Copy the action code
WORKDIR /usr/src/action

# Set environment variables
ENV NODE_ENV production
ENV KUBECTL_BASE_URL="https://dl.k8s.io/release"
ENV KUBECTL_VERSION="v1.26.0"
ENV KUBECTL_ENV_URL_PATH="bin/linux/amd64/kubectl"
ENV HELM_BASE_URL="https://get.helm.sh"
ENV HELM_2_FILE="helm-v2.17.0-linux-amd64.tar.gz"
ENV HELM_3_FILE="helm-v3.10.2-linux-amd64.tar.gz"
ENV BIN_DIR="/usr/local/bin"

# Install Kubectl, Helm 2, Helm 3 and other packages
RUN apk add --no-cache curl bash && \
    # Install Kubectl
    curl -LO "${KUBECTL_BASE_URL}/${KUBECTL_VERSION}/${KUBECTL_ENV_URL_PATH}" && \
    chmod +x ./kubectl && \
    mv ./kubectl ${BIN_DIR}/kubectl && \
    # Install Helm v2
    curl -L ${HELM_BASE_URL}/${HELM_2_FILE} | tar -xvz && \
    mv linux-amd64/helm ${BIN_DIR}/helm2 && \
    chmod +x ${BIN_DIR}/helm2 && \
    rm -rf linux-amd64 && \
    helm2 init --client-only && \
    # Install Helm v3
    curl -L ${HELM_BASE_URL}/${HELM_3_FILE} | tar -xvz && \
    mv linux-amd64/helm ${BIN_DIR}/helm && \
    chmod +x ${BIN_DIR}/helm && \
    rm -rf linux-amd64

COPY . .

# If the --check-cache option is set [...]
# This is recommended as part of your CI workflows if you're both following the Zero-Installs model
# and accepting PRs from third-parties, as they'd otherwise have the ability to alter the checked-in
# packages before submitting them.
RUN yarn install --immutable --immutable-cache --check-cache

RUN yarn build

COPY . ./

ENTRYPOINT ["yarn", "start"]
