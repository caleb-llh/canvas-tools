#! /bin/bash
FILE=$1
TITLE="${FILE%.*}"
mkdir -p outputs/$TITLE
npx canvas-sketch ${FILE} --open --output=outputs/$TITLE