#!/bin/zsh

source .env

export FIREBASE_CREDENTIALS
export FIREBASE_PROJECT_ID
export FIREBASE_STORAGE_BUCKET
export JWT_SECRET
export PORT
export APP_ROOT
export TEST

bazel run --java_runtime_version=remotejdk_11 //server:server_app