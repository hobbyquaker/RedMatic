#!/bin/bash

BUILD_DIR=`cd ${0%/*} && pwd -P`

mkdir $BUILD_DIR/dist 2> /dev/null

echo "installing build dependencies..."
npm install --only=dev --global-style --no-package-lock

./build_addon.sh x86_64
#./build_addon.sh i686
#./build_addon.sh armv6l
./build_addon.sh armv7l
./build_addon.sh aarch64

./build_release_body.sh
./build_change_history.sh

cat RELEASE_BODY.md
