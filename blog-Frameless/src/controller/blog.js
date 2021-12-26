const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  // 1=1 为了兼容报错问题，如果author没值，只有where报错
  let sql = 'select * from blogs where 1=1 ' // 注意空格
  if (author) {
    sql += `and author='${author}' ` // 注意空格
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' ` // 注意空格
  }
  sql += `order by createtime desc;`

  // 返回promise
  return exec(sql)
}

const getDetail = (id) => {
  // 先返回假数据
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: 1639797208956,
    author: 'zhangsan'
  }
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含title、content属性
  console.log('newBlog: blogData: ', blogData)
  
  return {
    id: 3   // 表示新建博客，插入到数据表里面的id（实际是一个自动生成的递增id）
  }
}

const updateBlog = (id, blogData = {}) => {
  // id 就是要更新博客的 id
  // blogData 是一个博客对象，包含 title、content 属性
  console.log('update Blog: ', `id: ${id}`, blogData)

  // 返回true表示更新成功
  return true
}

const delBlog = (id) => {
  // id 被删除博客的id

  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}