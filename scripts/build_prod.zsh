#!/bin/zsh

pushd web
npm run build:prod
popd

bazel build //server:server_app_fat_deploy.jar