#!/bin/bash

yarn build
cd build
rsync -ruL . cloud_nginx:/srv/scioly_tests/ -v
cd ..
