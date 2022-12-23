#! /bin/bash
FILE=$1
TITLE="${FILE%.*}"
mkdir -p outputs/$TITLE
npx canvas-sketch ${FILE} --open --hot --output=outputs/$TITLE --stream=mp4