#!/bin/bash
git pull origin master
docker save -o "/home/yonic/aja-projects/image-backup/exam-back-img-$(date).tar" exam-back-img
docker stop exam-back
docker rm --force exam-back
docker rmi --force exam-back-img
docker build --rm -t exam-back-img .
docker run -d -p 3004:3004 --restart always --name exam-back --add-host db.aja.local:192.168.70.3 exam-back-img
docker image prune -f