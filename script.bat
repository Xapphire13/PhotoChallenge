@echo off
setlocal

REM Check if an argument was provided
IF "%~1"=="" (
  echo Error: Please provide a filename as the first argument.
  exit /b 1
)

REM Replace colons with underscores using string substitution
SET "SCRIPT_NAME=%~1"
SET "SCRIPT_NAME=%SCRIPT_NAME::=_%"

REM Check if the script file exists in the scripts directory
IF NOT EXIST "scripts\%SCRIPT_NAME%.bat" (
  echo Error: Script file 'scripts\%SCRIPT_NAME%.bat' not found.
  exit /b 1
)

REM Execute the second script
CALL scripts\%SCRIPT_NAME%.bat