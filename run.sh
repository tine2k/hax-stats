#!/bin/sh
npm i
cd frontend || exit
npm i
npm run build
cd .. || exit
node index.js
