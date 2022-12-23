#! /bin/bash

read -p "Title: " title
NEW_FILE=${title}.js

# open today's file if it exists
regex="${NEW_FILE}"
for file in ./*; do
    if [[ $file =~ $regex ]]; then
        echo "${file} exists.  Run 'make open file=${file}' instead."
        exit 0
    fi
done

# else create new file
npx canvas-sketch ${NEW_FILE} --new --open --hot --template=$1
