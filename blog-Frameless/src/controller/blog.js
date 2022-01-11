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
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => {
    // 处理成对象
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含title、content属性
  
  // return {
  //   id: 3   // 表示新建博客，插入到数据表里面的id（实际是一个自动生成的递增id）
  // }
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author
  const createTime = Date.now()
  const updateTime = Date.now()
  const sql = `
    insert into blogs (title, content, createtime, author, updateTime) values ('${title}', '${content}', ${createTime}, '${author}', ${updateTime})
  `
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  // id 就是要更新博客的 id
  // blogData 是一个博客对象，包含 title、content 属性
  // console.log('update Blog: ', `id: ${id}`, blogData)

  const title = blogData.title
  const content = blogData.content
  const updateTime = Date.now()

  const sql = `
    update blogs set title='${title}', content='${content}', updatetime=${updateTime} where id=${id}
  `

  return exec(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

const delBlog = (id,author) => {
  // id 被删除博客的id
  const sql = `delete from blogs where id='${id}' and author='${author}'`

  return exec(sql).then(deleteData => {
    if (deleteData.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}