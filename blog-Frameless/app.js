const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 用于处理postData
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    // 接收数据
    let postData =''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
      console.log('----------------------------------------')
    })
  })
  return promise
}

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader('Content-Type', 'application/json')

  // 思考：在这处理跨域其实是不对的，因为没判断请求的地址。
  // 应该要判断请求的地址是否是我们自己项目的地址，否则就会导致所有网页请求我们的后端都允许跨域请求。这是不安全的。
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  // 设置Access-Control-Allow-Credentials时,Access-Control-Allow-Origin需要设置为具体域名，不能用*
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8082')
  // res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

  // 获取path
  const url = req.url
  req.path = url.split('?')[0]

  // 解析query
  req.query = querystring.parse(url.split('?')[1])

  // 解析cookie，将string处理成object赋值给req.cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if(!item){
      return;
    }
    const arr = item.split('=')
    // 前端频繁设置的cookie会自动拼接一个空格，需要去掉
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  })

  // 处理postData
  getPostData(req).then(postData => {
    req.body = postData

    // 1.处理blog路由
    // const blogData = handleBlogRouter(req, res)
    // if (blogData) {
    //   res.end(
    //     JSON.stringify(blogData)
    //   )
    //   return
    // }

    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }

    // 2.处理user路由
    // const userData = handleUserRouter(req, res)
    // if (userData) {
    //   res.end(
    //     JSON.stringify(userData)
    //   )
    //   return
    // }
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        res.end(
          JSON.stringify(userData)
        )
      })
      return
    }

    // 处理跨域的预检请求
    if (req.method == 'OPTIONS') {
      res.writeHead(200);
      res.end('');
      return
    }

    // 3.未命中路由返回404
    res.writeHead(404, {'Content-type': 'text/plain'})
    res.write('404 Not Found\n')
    res.end()
  })

}

module.exports = serverHandle

// env: process.env.NODE_ENV
// 通过该方式取得环境变量，process提供的全局变量
// 通过识别环境，返回不一样的数据，接口的处理等都不一致
