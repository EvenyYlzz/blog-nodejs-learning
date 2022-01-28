const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.error(err)
})

const set = (key, val) => {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  // 只能存储字符串，如果不进行stringify，那么会直接存入val.toString()，是不符合预期的
  redisClient.set(key, val, redis.print)
}

// get的获取是异步的，所以需要借助promise来进行封装
const get = (key) => {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }

      // 传一个不存在的key值时，会返回null
      if (val === null) {
        resolve(null)
        return
      }
      
      try {
        resolve(
          JSON.parse(val)
        )
      } catch(ex) {
        resolve(val)
      }
    })
  })

  return promise
}

module.exports = {
  set,
  get
}