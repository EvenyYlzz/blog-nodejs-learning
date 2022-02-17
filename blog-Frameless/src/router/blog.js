const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')

const { SuccessModel, ErrorModel } = require('../model/resModel')

// 统一的登录验证函数，课程中这样使用，但我个人觉得这种做法不如我自己的做法，所以这一节注释掉
// const loginCheck = (req) => {
//   if (!req.session.username) {
//     return Promise.resolve(
//       new ErrorModel('尚未登录')
//     )
//   }
// }

const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''

    // const listData = getList(author, keyword)
    // return new SuccessModel(listData)

    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    // const detailData = getDetail(id)
    // return new SuccessModel(detailData)

    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 有值就是未登录
      return loginCheck
    }

    const result = getDetail(id)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  // 新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    // const data = newBlog(req.body)
    // return new SuccessModel(data)

    // 暂时假数据
    // const author = 'zhangsan'
    // req.body.author = author

    // const loginCheckResult = loginCheck(req)
    // if (loginCheckResult) {
    //   // 有值就是未登录
    //   return loginCheck
    // }

    // 此时前端可以不传username，从session拿
    // req.body.author = req.session.username

    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {

    // const loginCheckResult = loginCheck(req)
    // if (loginCheckResult) {
    //   // 有值就是未登录
    //   return loginCheck
    // }

    const result = updateBlog(id, req.body)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新博客失败')
      }
    })
  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    // 暂时假数据
    // const author = 'zhangsan'
    // req.body.author = author

    // const loginCheckResult = loginCheck(req)
    // if (loginCheckResult) {
    //   // 有值就是未登录
    //   return loginCheck
    // }

    const result = delBlog(id, req.body.author)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新博客失败')
      }
    })
  }
}

module.exports = handleBlogRouter
