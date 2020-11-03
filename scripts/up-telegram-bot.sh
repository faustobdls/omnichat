#!/bin/bash
cd backends/telegram
npx tsc -w src/index.ts &
node src/index.js