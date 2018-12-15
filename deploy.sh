#!/bin/bash

cd /root/www/logServer
git pull
npm run build
pm2 restart logServer
