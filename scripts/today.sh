#! /bin/bash

year=`date +'%Y'`
month=`date +'%m'`
day=`date +'%d'`

# make sure today's folder exist
mkdir -p ${year}/${month}

# open today's file if it exists
regex="\/${day}_"
for file in ${year}/${month}/*; do
    if [[ $file =~ $regex ]]; then
        npx canvas-sketch ${file} --open
    fi
done

# else create new file
read -p "Title: " title
TODAYS_FILE=${year}/${month}/${day}_${title}.js
npx canvas-sketch ${TODAYS_FILE} --new --open