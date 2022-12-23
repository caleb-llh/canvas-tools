#! /bin/bash

read -p "Title: " title
NEW_FILE=${title}.js

# open today's file if it exists
regex="${NEW_FILE}"
for file in ./*; do
    if [[ $file =~ $regex ]]; then
        npx canvas-sketch ${file} --open
    fi
done

# else create new file
npx canvas-sketch ${NEW_FILE} --new --open
