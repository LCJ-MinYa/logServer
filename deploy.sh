#!/bin/bash

echo "start"
cd /root/www/logServer
git pull
npm run build
pm2 restart logServer
echo "done"
