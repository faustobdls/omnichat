#!/bin/bash
cd functions
npm i
npx tsc -w &
npm run build
cd ..
firebase emulators:start