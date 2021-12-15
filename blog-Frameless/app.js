const serverHandle = (req, res) => {
  // 设置返回格式
  res.setHeader('Content-type', 'application/json')

  const resData = {
    name: 'Even100',
    site: 'juejin',
    env: process.env.NODE_ENV,
    // 通过该方式取得环境变量，process提供的全局变量
    // 通过识别环境，返回不一样的数据，接口的处理等都不一致
  }

  res.end(
    JSON.stringify(resData)
  )
}

module.exports = serverHandle