#!/bin/bash
echo "execute webpack packing......"
npm run build
if [ $? != 0 ]; then
  exit 1
fi
echo "webpack done ! "

cd dist
tar -czvf edit-system-fe.tar.gz ./assets ./template favicon.ico
rm -rf ./assets ./template favicon.ico
cd ..
echo "build to dist done ! "
