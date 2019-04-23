#!/bin/bash
# NODEJS_VERSION="11"
# IONIC_VERSION="4.10.2"
# ANDROID_SDK_VERSION="4333796"
# ANDROID_HOME="/opt/android-sdk"
# ANDROID_BUILD_TOOLS_VERSION="26.1.1"

# 1) Install system package dependencies
# 2) Install Nodejs/NPM/Ionic-Cli
# 3) Install Android SDK
# 4) Install SDK tool for support ionic build command
# 5) Cleanup
# 6) Add and set user for use by ionic and set work folder

apt-get update
apt-get install -y
build-essential

openjdk-8-jre
openjdk-8-jdk
curl
unzip
git
gradle
# curl -sL https://deb.nodesource.com/setup_$NODEJS_VERSION.x | bash - \
apt-get update
apt-get install -y nodejs
npm install -g cordova ionic@$IONIC_VERSION
cd /tmp

curl -fSLk https://dl.google.com/android/repository/sdk-tools-linux-$ANDROID_SDK_VERSION.zip -o sdk-tools-linux-$ANDROID_SDK_VERSION.zip
unzip sdk-tools-linux-$ANDROID_SDK_VERSION.zip
mkdir /opt/android-sdk
mv tools /opt/android-sdk
(while sleep 3; do echo "y"; done) | $ANDROID_HOME/tools/bin/sdkmanager --licenses

$ANDROID_HOME/tools/bin/sdkmanager "platform-tools"
$ANDROID_HOME/tools/bin/sdkmanager "build-tools;$ANDROID_BUILD_TOOLS_VERSION"
apt-get autoremove -y
rm -rf /tmp/sdk-tools-linux-$ANDROID_SDK_VERSION.zip
