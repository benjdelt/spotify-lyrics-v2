#!/usr/bin/env bash

# This script runs the git commands to deploy the project on Netlify from an existing branch
# called "production".

# Preliminary Validations

readonly production="production"
readonly master="master"
readonly origin="origin"

function is_branch() {
    if [ ! `git branch --show-current | egrep "^$1$"` ] && [ ! `git branch | egrep "^[[:space:]]+$1$"` ]
    then
        echo "Error: branch not found, $1"
        exit 1
    fi
}

if [ ! -d .git ]
then
    echo "Error: not in a git repo"
    exit 1
fi

is_branch $master
is_branch $production

if [ ! `git remote | egrep "^${origin}$"` ]
then
    echo "Error: remote ${origin} not found"
    exit 1
fi

# Deployment Commands

git checkout production
git merge master production
git push origin production
git checkout master
