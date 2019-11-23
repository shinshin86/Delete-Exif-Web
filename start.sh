#!/bin/bash
trap killall SIGINT

killall(){
  echo '*** good bye ***'
  kill 0
}

echo '*** Start 2 process ------------> delete exif web app ***'
cd backend/ && python3 delete_exif_web.py &
cd frontend/ && yarn run start
