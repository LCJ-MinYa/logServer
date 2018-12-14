#!/bin/bash
#!/bin/node

cd /root/www/logServer
git pull
apidoc -i src/ -o view/index
node babel --no-babelrc src/ --presets think-node --out-dir app/
pm2 restart logServer