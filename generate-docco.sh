#!/bin/bash

./node_modules/.bin/docco -o docs/docco -l parallel -c conf/docco/parallel.css -L conf/docco/languages.json source/fun.js
