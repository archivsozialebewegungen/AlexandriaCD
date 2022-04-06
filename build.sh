#!/bin/bash

if [ -d dist ]; then
	rm -r dist
fi

ng build --base-href=""

sed -i 's/\s*type="module">/>/g' dist/alexandria-cd/index.html 
sed -i 's/\s*defer>/>/g' dist/alexandria-cd/index.html 

(cd dist/alexandria-cd/assets; rm -r data.js pdf screen thumbnails)
(cd dist/alexandria-cd; zip -r ../../app.zip *)
