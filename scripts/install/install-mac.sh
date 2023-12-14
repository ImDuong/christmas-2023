#!/bin/bash

# Step 1. Check if npm / yarn installed. If not, warning and stop
# Step 2. Install dependencies based on package.json (prioritizing yarn)

if command -v node > /dev/null 2>&1; then
    NODE_VERSION=$(node -v)
    echo "Node $NODE_VERSION is installed"
else
    echo "Warning: Node.js is not installed. Please install Node.js"
    exit 1
    
if command -v yarn > /dev/null 2>&1; then
    YARN_VERSION=$(yarn -v)
    echo "Yarn $YARN_VERSION is installed"

    echo "Installing dependencies using yarn..."
    yarn install
else
    if command -v npm > /dev/null 2>&1; then
        NPM_VERSION=$(npm -v)
        echo "NPM $NPM_VERSION is installed"
    fi

    echo "Installing dependencies using npm..."
    npm install
fi

if [ $? -ne 0 ]; then
    echo "Warning: Both Yarn and NPM are not installed. Please install Yarn (https://yarnpkg.com/) or NPM (https://nodejs.org/)"
    exit 1
fi

echo "Dependencies installed successfully."
exit 0