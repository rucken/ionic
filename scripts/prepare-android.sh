#!/bin/bash
cd $1
cordova platform add android --save
ionic cordova prepare android