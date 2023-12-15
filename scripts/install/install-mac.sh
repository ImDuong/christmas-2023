#!/bin/bash

# Step 1. Check if npm / yarn installed. If not, warning and stop
# Step 2. Install dependencies based on package.json (prioritizing yarn)

if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo Node $NODE_VERSION is installed
else
    echo Warning: Node.js is not installed. Please install Node.js
    exit 1
fi

if command -v yarn &> /dev/null; then
    YARN_VERSION=$(yarn -v)
    echo Yarn $YARN_VERSION is installed
    echo Installing dependencies using yarn...
    yarn
else
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(yarn -v)
        echo NPM $NPM_VERSION is installed
        echo Installing dependencies using npm...
        npm install
    else
        echo Warning: Both Yarn and NPM are not installed. Please install Yarn or NPM
        exit 1
    fi
fi