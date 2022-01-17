import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.withCredentials = true

createApp(App).use(store).use(router).use(ElementPlus).mount('#app')


/*
  在axios中默认是不让后端写入cookie的
  在main.js中或者你封装的异步请求中设置   axios.defaults.withCredentials = true，如
  那么axios中的withCredentials是干嘛的？
  文档的描述是 “表示跨域请求时是否需要使用凭证”。
  开启withCredentials后，后端才可以写入cookie，并且服务器才能拿到你的cookie，当然后端服务器也要设置允许你获取你开启了才有用
*/