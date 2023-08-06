#!/bin/zsh

# Check if an argument was provided
if [ -z "$1" ]; then
  echo "Error: Please provide a filename as the first argument."
  exit 1
fi

# Replace colons with underscores using parameter expansion
SCRIPT_NAME=${1//:/_}

# Check if the script file exists in the scripts directory
if [ ! -f "scripts/$SCRIPT_NAME.zsh" ]; then
  echo "Error: Script file 'scripts/$SCRIPT_NAME.zsh' not found."
  exit 1
fi

# Execute the second script
./scripts/"$SCRIPT_NAME".zsh