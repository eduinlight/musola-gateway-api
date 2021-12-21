#!/bin/bash

# remove ssh known hosts
rm ~/.ssh/known_hosts

# exit the script on fails
set -e

# add private key variable to ssh trust list
eval $(ssh-agent -s)
echo "$PRIVATE_KEY" | tr -d '\r' | ssh-add - > /dev/null

mkdir -p ~/.ssh
chmod 700 ~/.ssh
ssh-keyscan $DEPLOY_SERVER >> ~/.ssh/known_hosts
chmod 644 ~/.ssh/known_hosts

#copy
scp ./docker-compose.yml ${DEPLOY_SERVER_USER}@${DEPLOY_SERVER}:~/docker-compose.yml

# enter to instance via ssh
ssh ${DEPLOY_SERVER_USER}@${DEPLOY_SERVER} 'bash -s' < ./deploy/in-server.sh \
  $CI_REGISTRY \
  $DEPLOY_TOKEN \
  $DEPLOY_TOKEN_PASSWORD \
  "${CI_REGISTRY}/${CI_PROJECT_NAMESPACE}/${CI_PROJECT_NAME}:${MUSOLATEST_GATEWAYS_API_IMAGE_NAME}" \
  $PORT
