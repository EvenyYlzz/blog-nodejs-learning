# blog-nodejs-learning
A simple blog system based on node.js

# 文件目录

## blog-Frameless
blog-Frameless  博客后端（纯原生nodejs搭建，未使用框架）
├── README.md
├── README1.md
├── app.js
├── bin
│   └── www.js
├── package-lock.json
├── package.json
├── sql.md
└── src
    ├── conf
    │   └── db.js
    ├── controller
    │   ├── blog.js
    │   └── user.js
    ├── db
    │   └── mysql.js
    ├── model
    │   └── resModel.js
    └── router
        ├── blog.js
        └── user.js


## blog-frameless-front
blog-frameless-front 博客前端（基于vue脚手架搭建的vue3项目）
├── README.md
├── README1.md
├── babel.config.js
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
└── src
    ├── App.vue
    ├── assets
    │   └── logo.png
    ├── components
    │   └── HelloWorld.vue
    ├── main.js
    ├── router
    │   └── index.js
    ├── store
    │   └── index.js
    ├── utils
    │   └── getHMS.js
    └── views
        ├── Home.vue
        ├── List
        └── Login.vue

## http-demo
http-demo 在开始学习nodejs前应掌握的一些基础nodejs知识点
├── README1.md
├── debugger-test
├── http-mainTest
├── http-test-get
├── http-test-post
├── nodejs-mysql-test
└── promise-test
