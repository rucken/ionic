#!/bin/bash
npm run all:build
gh-pages -d dist/demo --repo https://${GH_TOKEN}@github.com/rucken/ionic.git