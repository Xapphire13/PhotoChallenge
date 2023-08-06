@echo off
setlocal

REM Load the global environment variables from the .env file
for /f "usebackq tokens=1,2 delims==" %%G in (".env") do (
    set %%G=%%H
    setx %%G %%H
)

bazel run --java_runtime_version=remotejdk_11 //server:server_app