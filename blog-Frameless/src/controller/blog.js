const getList = (author, keyword) => {
  // 先返回假数据(格式是正确的)
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1639797208956,
      author: 'zhangsan'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: 1639797204234,
      author: 'lisi'
    }
  ]
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

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog
}