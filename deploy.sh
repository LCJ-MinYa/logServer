#!/bin/bash

cd /root/www/logServer
git pull
pm2 restart logServer