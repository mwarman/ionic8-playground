#!/bin/bash
# npm hook run before the build script
# see: https://ionic.io/docs/appflow/automation/environments
# see: https://ionic.io/docs/appflow/cookbook/hooks#npm-pre--post-scripts

# create .env file if running in Ionic Appflow
if [ "$CI_SERVER" = "yes" ]
then
  echo "Appflow build; creating .env file"
  echo "VITE_BUILD_DATE=$(date +'%Y-%m-%d')" > .env
  echo "VITE_BUILD_TIME=$(date +'%H:%M:%S%z')" >> .env
  echo "VITE_BUILD_TS=$(date +'%Y-%m-%dT%H:%M:%S%z')" >> .env
  echo "VITE_BUILD_COMMIT_SHA=$CI_GIT_COMMIT_SHA" >> .env
  echo "VITE_BUILD_WORKFLOW_RUNNER=Appflow" >> .env
  echo "VITE_BUILD_WORKFLOW_NAME=$CI_APP_NAME" >> .env
  echo "VITE_BUILD_WORKFLOW_RUN_NUMBER=$CI_BUILD_NUMBER" >> .env
else
  echo "NOT an Appflow build; skipping .env file creation"
fi
