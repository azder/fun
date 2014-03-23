#!/bin/bash

./node_modules/.bin/docco -o docs/docco -l parallel -c docco/parallel.css -L docco/languages.json source/fun.js
