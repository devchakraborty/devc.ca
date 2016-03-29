#!/bin/bash
npm run build && { cd build; http-server -p8080 -c-1; cd ..; }
