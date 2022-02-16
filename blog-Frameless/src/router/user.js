const _ = require('lodash')
const { get, set } = require('../db/redis')
const { login } = require('../controller/user')

const {
  SuccessModel, ErrorModel
} = require('../model/resModel')

const getCookieExpires = () => {
  const d = new Date()
  // 5分钟过期时间
  d.setTime(d.getTime() + (5 * 60 * 1000))
  return d.toGMTString()
}

// // 全局 session 数据
// const SESSION_DATA = {}

const handleUserRouter = (req, res) => {
  const method = req.method

  // -----------------------------------------------------------------------
  // session存放在进程中的内存

  // // 初始值为false
  // let needSetCookie = false
  // // 从cookie中取出“加密”的userid
  // let userId = req.cookie.userid
  // if (userId) {
  //   // 有userid但是没存取对应session时，给一个空对象
  //   if (!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {}
  //   }
  // } else {
  //   // 如果没有cookie，则需要设置cookie
  //   needSetCookie = true
  //   userId = `${Date.now()}_${Math.random()}` // 此处模拟加密，反正就是不能直接明文告诉前端cookie存的是啥
  //   SESSION_DATA[userId] = {}
  // }
  // // session 设置为全局数据中userid对应的value值
  // req.session = _.cloneDeep(SESSION_DATA[userId])

  // -----------------------------------------------------------------------
  // 使用redis
  let needSetCookie = false
  let userId = req.cookie.userid
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    // 初始化redis中的session值
    set(userId, {})
  }

  req.sessionId = userId
  // 获取session
  return get(req.sessionId).then(sessionData => {
    if (sessionData === null) {
      // 初始化redis中的session值
      set(req.sessionId, {})
      // 设置session
      req.session = {}
    } else {
      req.session = sessionData
    }
  }).then(() => {
    // -----------------------------------------------------------------------

    // 登陆
    if (method === 'POST' && req.path === '/api/user/login') {
      const { username, password } = req.body
      const result = login(username, password)

      return result.then(data => {
        if (data.username) {
          // 从服务端返回cookie到前端
          // 设置httpOnly禁止前端修改，设置之后前端通过document.cookie看不见
          // res.setHeader('Set-Cookie', `username=${username}; path=/; httpOnly; expires=${getCookieExpires()}`)

          // -----------------------------------------------------------------------
          // session存放在进程中的内存

          // // 需要设置cookie，设置userid为前面“加密”生成的
          // if (needSetCookie) {
          //   res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
          // }
          // // 设置session
          // req.session.username = data.username
          // req.session.realname = data.realname

          // // 拿到值之后回存到全局数据
          // SESSION_DATA[userId] = req.session

          // -----------------------------------------------------------------------
          if (needSetCookie) {
            res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
          }
          // 设置session
          req.session.username = data.username
          req.session.realname = data.realname
          // 同步到 redis
          set(req.sessionId, req.session)


          return new SuccessModel()
        }
        return new ErrorModel('登陆失败')
      })
    }

    // 登录验证的测试
    if (method === 'GET' && req.path === '/api/user/login-test') {
      if (req.session.username) {
        return Promise.resolve(
          new SuccessModel({
            session: req.session
          })
        )
      }
      return Promise.resolve(
        new ErrorModel('尚未登录')
      )
    }

  })


  // 梳理session全过程
  // 1.第一次走login接口，SESSION_DATA = {}, cookie = undefined
  // 2.所以 needSetCookie = true 需要设置cookie，cookie需要传递“加密生成”userid (假如为 666_777)
  // 3.生成后 SESSION_DATA = {
  //           666_777: {}
  //         }
  // 4.req.session = SESSION_DATA[userId]，即 req.session = {}
  // 5.走到login接口内，设置了cookie返回到前端userid=666_777，在这里拿到username、realname，所以
  // req.session = { username: 'zhangsan', realname: '张三' }
  // 并通过SESSION_DATA[userId] = req.session 回存到全局数据当中

  // 1.前端刷新登录校验，此时cookie取出来得到 666_777
  // 2.SESSION_DATA[userId] 取出来得到 { username: 'zhangsan', realname: '张三' }
  // 3.所以直接赋值给req.session
  // 4.再通过if (req.session.username) 来确定前端登录时间过期没，过期就返回未登录，没过期返回登录名称
}

module.exports = handleUserRouter
