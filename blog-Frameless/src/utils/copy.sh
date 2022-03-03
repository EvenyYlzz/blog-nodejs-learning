#!/bin/sh
cd /Users/yiyelin/github前端项目文件夹/blog-nodejs-learning/blog-Frameless/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log