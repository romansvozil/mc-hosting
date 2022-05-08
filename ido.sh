#!/usr/bin/env bash
set -e

declare triggered=0

show_help() {
  printf "\navailable actions\n---------------------"
  printf "\nAvailable commands:"
  printf "\n\tconfig \t\t\t- generates configuration"
  printf "\n\tprettier \t\t- runs prettier-php on given path"
  printf "\n\t\t\t\t  \`prettier ./classes/Aws/**.php\`"
  printf "\n\tprettier_fix \t\t- automatically fix all files for code formatting"
  printf "\n\tprettier_check \t\t- check all files for code formatting"
  printf "\n\teslint_fix \t\t- fix all files for code styling"
  printf "\n\teslint_check \t\t- check all files for code styling"
  printf "\n\n"
}

run_prettier_fix() {
  npx prettier ./src --write
}

run_prettier_check() {
  npx prettier ./src --list-different
}

run_eslint_fix() {
  npx eslint --fix --max-warnings=0 src
}

run_eslint_check() {
  npx eslint src
}

if [[ "$1" = "config" ]]; then
  # todo
  triggered=1
fi

if [[ "$1" = "prettier" && "$2" = "fix" ]]; then
  run_prettier_fix
  triggered=1
fi

if [[ "$1" = "prettier" && "$2" = "check" ]]; then
  run_prettier_fix
  triggered=1
fi

if [[ "$1" = "eslint" && "$2" = "fix" ]]; then
  run_eslint_fix
  triggered=1
fi

if [[ "$1" = "eslint" && "$2" = "check" ]]; then
  run_eslint_check
  triggered=1
fi

if [[ $triggered = 0 ]]; then
  show_help
fi
