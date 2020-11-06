#!/bin/bash
source /etc/profile

# node version 12
node_version=$1
env=$2
nvm use $node_version
yarn install
if [ $env == production ]
then
    echo 'prod env'
    yarn build:prod
else
    if [ $env == dev ]
    then
      echo 'dev env'
      yarn build:dev
    else
      echo 'test env'
      yarn build:test
    fi
fi
cd dist
zip -r ../mall-consignment.zip *
cd ..
rm -rf dist
