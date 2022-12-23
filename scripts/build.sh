#! /bin/bash
FILE=$1
TITLE="${FILE%.*}"
npx canvas-sketch ${FILE} --name build/$TITLE --build --inline