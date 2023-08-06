#!/bin/zsh

pushd web
npm run build:dev
popd

bazel build //server:server_app