const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json')

  // 获取path
  const url = req.url
  req.path = url.split('?')[0]

  // 处理blog路由
  const blogData = handleBlogRouter(req, res)
  if (blogData) {
    res.end(
      JSON.stringify(blogData)
    )
    return
  }

  // 处理user路由
  const userData = handleUserRouter(req, res)
  if (userData) {
    res.end(
      JSON.stringify(userData)
    )
    return
  }

  // 未命中路由返回404
  res.writeHead(404, {'Content-type': 'text/plain'})
  res.write('404 Not Found\n')
  res.end()
}

module.exports = serverHandle

// env: process.env.NODE_ENV
// 通过该方式取得环境变量，process提供的全局变量
// 通过识别环境，返回不一样的数据，接口的处理等都不一致
