#!/bin/bash
trap killall SIGINT

killall(){
  echo '*** good bye ***'
  kill 0
}

echo "============> NODE_ENV: ${NODE_ENV}"

echo '*** Start 2 process ------------> delete exif web app ***'
cd backend/ && python3 delete_exif_web.py &
cd frontend/ && yarn run build && yarn run start
