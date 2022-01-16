const env = process.env.NODE_ENV // 环境参数

// 配置
let MYSQL_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'http://127.0.0.1/',
    user: 'root',
    password: '520yyl',
    port: '3306',
    database: 'myblog'
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'http://127.0.0.1/',
    user: 'root',
    password: '520yyl',
    port: '3306',
    database: 'myblog'
  }
}

module.exports = {
  MYSQL_CONF
}