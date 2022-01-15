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

const handleUserRouter = (req, res) => {
  const method = req.method

  // 登陆
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    const result = login(username, password)

    return result.then(data => {
      if (data.username) {
        // 从服务端返回cookie到前端
        // 设置httpOnly禁止前端修改，设置之后前端通过document.cookie看不见
        res.setHeader('Set-Cookie', `username=${username}; path=/; httpOnly; expires=${getCookieExpires()}`)

        return new SuccessModel()
      }
      return new ErrorModel('登陆失败')
    })
  }

  // 使用get方法体验cookie
  // if (method === 'GET' && req.path === '/api/user/login') {
  //   const { username, password } = req.query
  //   const result = login(username, password)

  //   return result.then(data => {
  //     if (data.username) {
  //       // 从服务端返回cookie到前端
  //       // 设置httpOnly禁止前端修改，设置之后前端通过document.cookie看不见
  //       res.setHeader('Set-Cookie', `username=${username}; path=/; httpOnly; expires=${getCookieExpires()}`)

  //       return new SuccessModel()
  //     }
  //     return new ErrorModel('登陆失败')
  //   })
  // }

  // 登录验证的测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.cookie.username) {
      return Promise.resolve(
        new SuccessModel({
          username: req.cookie.username
        })
      )
    }
    return Promise.resolve(
      new ErrorModel('尚未登录')
    )
  }
}

module.exports = handleUserRouter
